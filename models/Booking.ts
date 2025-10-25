import mongoose, { Schema, Model } from 'mongoose';
import { BookingStatus, BookingType } from '@/types';

export interface IBooking {
  bookingRef: string;
  userId: string;
  type: BookingType;
  status: BookingStatus;
  passengerDetails: any;
  bookingDetails: any;
  amount: number;
  currency: string;
  paymentId?: string;
  paymentMethod?: string;
  tboReference?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookingRef: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(BookingType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    passengerDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    bookingDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    paymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    tboReference: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
bookingSchema.index({ bookingRef: 1 });
bookingSchema.index({ userId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
