// User & Auth Types
export type UserRole = 'CUSTOMER' | 'AGENT' | 'STAFF' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  verified: boolean
  createdAt: string
}

export interface Customer extends User {
  role: 'CUSTOMER'
  savedTravelers?: SavedTraveler[]
  savedGST?: GSTDetails[]
  wishlist?: string[]
  loyaltyPoints?: number
  referralCode?: string
}

export interface Agent extends User {
  role: 'AGENT'
  agencyName: string
  agentCode: string
  creditLimit: number
  availableCredit: number
  markup: number
  commission: number
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  customers?: Customer[]
}

export interface Staff extends User {
  role: 'STAFF'
  assignedAgents?: string[]
  permissions: string[]
}

export interface Admin extends User {
  role: 'ADMIN'
  permissions: string[]
}

export interface SavedTraveler {
  id: string
  title: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'M' | 'F' | 'O'
  passport?: PassportDetails
  frequentFlyerNumber?: string
}

export interface PassportDetails {
  number: string
  issueDate: string
  expiryDate: string
  nationality: string
  issuingCountry: string
}

export interface GSTDetails {
  number: string
  companyName: string
  email: string
  phone: string
  address: string
}

// Auth State
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

// B2B Types
export interface Quote {
  id: string
  reference: string
  agentId: string
  customerId?: string
  type: 'FLIGHT' | 'HOTEL' | 'PACKAGE'
  items: QuoteItem[]
  totalAmount: number
  currency: string
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
  validUntil: string
  createdAt: string
  updatedAt: string
}

export interface QuoteItem {
  id: string
  type: 'FLIGHT' | 'HOTEL'
  description: string
  details: any
  price: number
}

export interface Ledger {
  agentId: string
  balance: number
  creditLimit: number
  availableCredit: number
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  type: 'DEBIT' | 'CREDIT'
  amount: number
  description: string
  bookingReference?: string
  timestamp: string
  balance: number
}

export interface Commission {
  id: string
  agentId: string
  bookingReference: string
  bookingAmount: number
  commissionPercent: number
  commissionAmount: number
  status: 'PENDING' | 'APPROVED' | 'PAID'
  paidAt?: string
  createdAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  agentId: string
  bookingReference: string
  items: InvoiceItem[]
  subtotal: number
  gst: number
  total: number
  currency: string
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED'
  issuedAt: string
  dueDate: string
}

export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
  gstRate: number
  gstAmount: number
}
