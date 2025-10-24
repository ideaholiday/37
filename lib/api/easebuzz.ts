import crypto from 'crypto';
import axios from 'axios';

const EASEBUZZ_MERCHANT_KEY = process.env.EASEBUZZ_MERCHANT_KEY || '';
const EASEBUZZ_SALT = process.env.EASEBUZZ_SALT || '';
const EASEBUZZ_ENV = process.env.EASEBUZZ_ENV || 'test';

const EASEBUZZ_URL =
  EASEBUZZ_ENV === 'prod'
    ? 'https://pay.easebuzz.in'
    : 'https://testpay.easebuzz.in';

class EasebuzzService {
  generateHash(data: any): string {
    const hashString = `${EASEBUZZ_MERCHANT_KEY}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${EASEBUZZ_SALT}`;
    return crypto.createHash('sha512').update(hashString).digest('hex');
  }

  async initiatePayment(paymentData: {
    txnid: string;
    amount: number;
    productinfo: string;
    firstname: string;
    email: string;
    phone: string;
    surl: string;
    furl: string;
  }) {
    try {
      const hash = this.generateHash(paymentData);

      const payload = {
        key: EASEBUZZ_MERCHANT_KEY,
        txnid: paymentData.txnid,
        amount: paymentData.amount,
        productinfo: paymentData.productinfo,
        firstname: paymentData.firstname,
        email: paymentData.email,
        phone: paymentData.phone,
        surl: paymentData.surl,
        furl: paymentData.furl,
        hash: hash,
      };

      const response = await axios.post(
        `${EASEBUZZ_URL}/payment/initiateLink`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
        paymentUrl: response.data.data,
      };
    } catch (error: any) {
      console.error('Easebuzz Payment Initiation Error:', error.message);
      return {
        success: false,
        error: 'Failed to initiate payment',
      };
    }
  }

  verifyPayment(responseData: any): boolean {
    try {
      const receivedHash = responseData.hash;
      const status = responseData.status;
      
      if (status === 'success') {
        const hashString = `${EASEBUZZ_SALT}|${status}|||||||||||${responseData.email}|${responseData.firstname}|${responseData.productinfo}|${responseData.amount}|${responseData.txnid}|${EASEBUZZ_MERCHANT_KEY}`;
        const calculatedHash = crypto
          .createHash('sha512')
          .update(hashString)
          .digest('hex');

        return calculatedHash === receivedHash;
      }
      
      return false;
    } catch (error) {
      console.error('Easebuzz Payment Verification Error:', error);
      return false;
    }
  }

  async getTransactionStatus(txnid: string) {
    try {
      const response = await axios.post(
        `${EASEBUZZ_URL}/transaction/v1/retrieve`,
        {
          key: EASEBUZZ_MERCHANT_KEY,
          txnid: txnid,
          amount: '',
          email: '',
          phone: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Easebuzz Transaction Status Error:', error.message);
      return {
        success: false,
        error: 'Failed to get transaction status',
      };
    }
  }

  async initiateRefund(refundData: {
    txnid: string;
    refund_amount: number;
    phone: string;
    email: string;
  }) {
    try {
      const response = await axios.post(
        `${EASEBUZZ_URL}/refund/v1/create`,
        {
          key: EASEBUZZ_MERCHANT_KEY,
          ...refundData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Easebuzz Refund Error:', error.message);
      return {
        success: false,
        error: 'Failed to process refund',
      };
    }
  }
}

export default new EasebuzzService();
