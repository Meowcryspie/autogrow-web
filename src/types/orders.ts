export type UserRole = 'customer' | 'admin' | 'operator';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  facility_name?: string;
  facilityName?: string;
  role: UserRole;
  created_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  modelCode?: string;
  quantity: number;
  price: number;
  category?: string;
}

export interface CustomerOrder {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  company_name?: string;
  facility_voltage?: string;
  shipping_address: string;
  total_amount: number;
  items: OrderItem[];
  status: OrderStatus;
  notes?: string;
  created_at: string;
}

export type InquiryCategory = 'technical_support' | 'quote_inquiry' | 'feedback' | 'general';
export type InquiryStatus = 'new' | 'read' | 'in_progress' | 'resolved';

export interface CustomerInquiry {
  id: string;
  user_id?: string | null;
  name: string;
  email: string;
  subject: string;
  category: InquiryCategory;
  message: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
}
