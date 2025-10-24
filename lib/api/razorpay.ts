import crypto from 'crypto';
import axios from 'axios';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

class RazorpayService {
  async createOrder(amount: number, currency: string = 'INR', receipt: string) {
    try {
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      
      const response = await axios.post(
        'https://api.razorpay.com/v1/orders',
        {
          amount: amount * 100, // Amount in paise
          currency,
          receipt,
        },
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        orderId: response.data.id,
        amount: response.data.amount,
        currency: response.data.currency,
      };
    } catch (error: any) {
      console.error('Razorpay Order Creation Error:', error.message);
      return {
        success: false,
        error: 'Failed to create payment order',
      };
    }
  }

  verifyPayment(orderId: string, paymentId: string, signature: string): boolean {
    try {
      const text = `${orderId}|${paymentId}`;
      const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      return generated_signature === signature;
    } catch (error) {
      console.error('Razorpay Payment Verification Error:', error);
      return false;
    }
  }

  async capturePayment(paymentId: string, amount: number) {
    try {
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      
      const response = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/capture`,
        {
          amount: amount * 100,
        },
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Razorpay Payment Capture Error:', error.message);
      return {
        success: false,
        error: 'Failed to capture payment',
      };
    }
  }

  async refundPayment(paymentId: string, amount?: number) {
    try {
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      
      const payload: any = {};
      if (amount) {
        payload.amount = amount * 100;
      }

      const response = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
        payload,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        refundId: response.data.id,
      };
    } catch (error: any) {
      console.error('Razorpay Refund Error:', error.message);
      return {
        success: false,
        error: 'Failed to process refund',
      };
    }
  }
}

export default new RazorpayService();
