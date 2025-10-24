import axios from 'axios';
import { TBOAuthResponse, TBOFlightSearchRequest } from '@/types';
import { SocksProxyAgent } from 'socks-proxy-agent';

// TBO API Configuration based on official documentation
const TBO_CLIENT_ID = process.env.NEXT_PUBLIC_TBO_CLIENT_ID || 'tboprod';
const TBO_USERNAME = process.env.NEXT_PUBLIC_TBO_USERNAME || 'LKOM258';
const TBO_PASSWORD = process.env.NEXT_PUBLIC_TBO_PASSWORD || 'New@api/LKO$582';
const TBO_ENDUSER_IP = process.env.TBO_ENDUSER_IP || '157.245.100.148';
const TBO_PROXY = process.env.TBO_PROXY; // Optional proxy for bypassing IP restrictions

// TBO REST API Endpoints
const TBO_AUTH_URL = 'https://api.travelboutiqueonline.com/SharedAPI/SharedData.svc/rest/Authenticate';
const TBO_FLIGHT_SEARCH_URL = 'https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/Search';
const TBO_FLIGHT_FAREQUOTE_URL = 'https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/FareQuote';
const TBO_FLIGHT_FARERULE_URL = 'https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/FareRule';
const TBO_FLIGHT_SSR_URL = 'https://tboapi.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/SSR';
const TBO_FLIGHT_BOOK_URL = 'https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/Book';
const TBO_FLIGHT_TICKET_URL = 'https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/Ticket';
const TBO_FLIGHT_BOOKING_DETAILS_URL = 'https://booking.travelboutiqueonline.com/AirAPI_V10/AirService.svc/rest/GetBookingDetails';

const TBO_HOTEL_AUTH_URL = 'http://Sharedapi.tektravels.com/SharedData.svc/rest/Authenticate';
const TBO_HOTEL_SEARCH_URL = 'https://affiliate.tektravels.com/HotelAPI/Search';
const TBO_HOTEL_PREBOOK_URL = 'https://affiliate.tektravels.com/HotelAPI/PreBook';
const TBO_HOTEL_BOOK_URL = 'https://HotelBE.tektravels.com/hotelservice.svc/rest/book/';
const TBO_HOTEL_BOOKING_DETAILS_URL = 'https://HotelBE.tektravels.com/hotelservice.svc/rest/Getbookingdetail';
const TBO_HOTEL_CANCEL_URL = 'https://hotelbooking.travelboutiqueonline.com/HotelAPI_V10/HotelService.svc/rest/CancelBooking';

class TBOService {
  private tokenId: string = '';
  private tokenExpiry: number = 0;

  // Get axios config with proxy if configured
  private getAxiosConfig() {
    const config: any = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    };

    // Add proxy if configured (for bypassing IP restrictions)
    if (TBO_PROXY) {
      try {
        const proxyAgent = new SocksProxyAgent(TBO_PROXY);
        config.httpAgent = proxyAgent;
        config.httpsAgent = proxyAgent;
        console.log('Using TBO proxy:', TBO_PROXY);
      } catch (error) {
        console.warn('Failed to configure proxy, proceeding without it:', error);
      }
    }

    return config;
  }

  async authenticate(): Promise<string> {
    // Return cached token if still valid
    if (this.tokenId && Date.now() < this.tokenExpiry) {
      return this.tokenId;
    }

    try {
      const response = await axios.post<TBOAuthResponse>(
        TBO_AUTH_URL,
        {
          ClientId: TBO_CLIENT_ID,
          UserName: TBO_USERNAME,
          Password: TBO_PASSWORD,
          EndUserIp: TBO_ENDUSER_IP,
        },
        this.getAxiosConfig()
      );

      if (response.data.Status === 1 && response.data.TokenId) {
        this.tokenId = response.data.TokenId;
        // Token valid for 30 minutes
        this.tokenExpiry = Date.now() + 25 * 60 * 1000; // 25 minutes to be safe
        return this.tokenId;
      } else {
        throw new Error(response.data.Error?.ErrorMessage || 'Authentication failed');
      }
    } catch (error: any) {
      console.error('TBO Authentication Error:', error.message);
      throw new Error('Failed to authenticate with TBO API');
    }
  }

  async searchFlights(searchParams: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const requestBody: TBOFlightSearchRequest = {
        EndUserIp: TBO_ENDUSER_IP,
        TokenId: token,
        AdultCount: searchParams.adults || 1,
        ChildCount: searchParams.children || 0,
        InfantCount: searchParams.infants || 0,
        DirectFlight: false,
        OneStopFlight: false,
        JourneyType: searchParams.tripType === 'Return' ? 2 : 1,
        PreferredAirlines: '',
        Segments: [
          {
            Origin: searchParams.origin,
            Destination: searchParams.destination,
            FlightCabinClass: searchParams.class === 'Business' ? 3 : 2,
            PreferredDepartureTime: searchParams.departureDate,
            PreferredArrivalTime: searchParams.departureDate,
          },
        ],
        Sources: '',
      };

      if (searchParams.tripType === 'Return' && searchParams.returnDate) {
        requestBody.Segments.push({
          Origin: searchParams.destination,
          Destination: searchParams.origin,
          FlightCabinClass: searchParams.class === 'Business' ? 3 : 2,
          PreferredDepartureTime: searchParams.returnDate,
          PreferredArrivalTime: searchParams.returnDate,
        });
      }

      const response = await axios.post(
        TBO_FLIGHT_SEARCH_URL,
        requestBody,
        this.getAxiosConfig()
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Flight Search Error:', error.message);
      throw new Error('Failed to search flights');
    }
  }

  async fareQuote(resultIndex: string, traceId: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_FLIGHT_FAREQUOTE_URL,
        {
          EndUserIp: TBO_ENDUSER_IP,
          TokenId: token,
          ResultIndex: resultIndex,
          TraceId: traceId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Fare Quote Error:', error.message);
      throw new Error('Failed to get fare quote');
    }
  }

  async getFareRule(resultIndex: string, traceId: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_FLIGHT_FARERULE_URL,
        {
          EndUserIp: TBO_ENDUSER_IP,
          TokenId: token,
          ResultIndex: resultIndex,
          TraceId: traceId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Fare Rule Error:', error.message);
      throw new Error('Failed to get fare rule');
    }
  }

  async searchHotels(searchParams: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_HOTEL_SEARCH_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          CheckInDate: searchParams.checkIn,
          CheckOutDate: searchParams.checkOut,
          CityId: searchParams.cityId,
          GuestNationality: searchParams.nationality || 'IN',
          NoOfRooms: searchParams.rooms || 1,
          RoomGuests: searchParams.roomGuests || [
            {
              NoOfAdults: searchParams.adults || 2,
              NoOfChild: searchParams.children || 0,
              ChildAge: searchParams.childAges || [],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Hotel Search Error:', error.message);
      throw new Error('Failed to search hotels');
    }
  }

  async hotelPreBook(bookingCode: string, traceId: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_HOTEL_PREBOOK_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          BookingCode: bookingCode,
          TraceId: traceId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Hotel PreBook Error:', error.message);
      throw new Error('Failed to prebook hotel');
    }
  }

  async bookFlight(bookingData: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_FLIGHT_BOOK_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          ...bookingData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Flight Booking Error:', error.message);
      throw new Error('Failed to book flight');
    }
  }

  async ticketFlight(bookingId: string, pnr: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_FLIGHT_TICKET_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          BookingId: bookingId,
          PNR: pnr,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Flight Ticketing Error:', error.message);
      throw new Error('Failed to ticket flight');
    }
  }

  async getFlightBookingDetails(bookingId: string, pnr: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_FLIGHT_BOOKING_DETAILS_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          BookingId: bookingId,
          PNR: pnr,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Get Booking Details Error:', error.message);
      throw new Error('Failed to get booking details');
    }
  }

  async bookHotel(bookingData: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_HOTEL_BOOK_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          ...bookingData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Hotel Booking Error:', error.message);
      throw new Error('Failed to book hotel');
    }
  }

  async getHotelBookingDetails(bookingId: string, confirmationNo: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_HOTEL_BOOKING_DETAILS_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          BookingId: bookingId,
          ConfirmationNo: confirmationNo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Get Hotel Booking Details Error:', error.message);
      throw new Error('Failed to get hotel booking details');
    }
  }

  async cancelHotelBooking(bookingId: string, requestType: string = 'Cancellation'): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        TBO_HOTEL_CANCEL_URL,
        {
          TokenId: token,
          EndUserIp: TBO_ENDUSER_IP,
          BookingId: bookingId,
          RequestType: requestType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Cancel Hotel Booking Error:', error.message);
      throw new Error('Failed to cancel hotel booking');
    }
  }
}

export default new TBOService();
