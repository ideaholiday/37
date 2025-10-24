import axios from 'axios';
import { TBOAuthResponse, TBOFlightSearchRequest } from '@/types';

const TBO_API_URL = process.env.TBO_API_URL || 'https://api.tektravels.com';
const TBO_USERNAME = process.env.TBO_API_USERNAME || '';
const TBO_PASSWORD = process.env.TBO_API_PASSWORD || '';

class TBOService {
  private tokenId: string = '';
  private tokenExpiry: number = 0;

  async authenticate(): Promise<string> {
    // Return cached token if still valid
    if (this.tokenId && Date.now() < this.tokenExpiry) {
      return this.tokenId;
    }

    try {
      const response = await axios.post<TBOAuthResponse>(
        `${TBO_API_URL}/SharedServices/SharedData.svc/rest/Authenticate`,
        {
          ClientId: TBO_USERNAME,
          UserName: TBO_USERNAME,
          Password: TBO_PASSWORD,
          EndUserIp: '1.1.1.1',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
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
        EndUserIp: '1.1.1.1',
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
        `${TBO_API_URL}/FlightAPI_V1/Search`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Flight Search Error:', error.message);
      throw new Error('Failed to search flights');
    }
  }

  async searchHotels(searchParams: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        `${TBO_API_URL}/HotelAPI_V1/Search`,
        {
          TokenId: token,
          EndUserIp: '1.1.1.1',
          CheckInDate: searchParams.checkIn,
          CheckOutDate: searchParams.checkOut,
          CityId: searchParams.cityId,
          GuestNationality: 'IN',
          NoOfRooms: searchParams.rooms || 1,
          RoomGuests: [
            {
              NoOfAdults: searchParams.adults || 2,
              NoOfChild: searchParams.children || 0,
              ChildAge: [],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Hotel Search Error:', error.message);
      throw new Error('Failed to search hotels');
    }
  }

  async bookFlight(bookingData: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        `${TBO_API_URL}/FlightAPI_V1/Book`,
        {
          TokenId: token,
          EndUserIp: '1.1.1.1',
          ...bookingData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Flight Booking Error:', error.message);
      throw new Error('Failed to book flight');
    }
  }

  async bookHotel(bookingData: any): Promise<any> {
    try {
      const token = await this.authenticate();
      
      const response = await axios.post(
        `${TBO_API_URL}/HotelAPI_V1/Book`,
        {
          TokenId: token,
          EndUserIp: '1.1.1.1',
          ...bookingData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('TBO Hotel Booking Error:', error.message);
      throw new Error('Failed to book hotel');
    }
  }
}

export default new TBOService();
