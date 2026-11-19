import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { CustomerOrder, OrderStatus, CustomerInquiry } from '../types/orders';

const LOCAL_ORDERS_KEY = 'autogrow_mock_orders';
const LOCAL_INQUIRIES_KEY = 'autogrow_mock_inquiries';

const SEED_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-1',
    order_number: 'AG-2026-8491',
    customer_name: 'Marcus Vance',
    customer_email: 'marcus.v@pacifichydro.nz',
    customer_phone: '+64 21 893 214',
    company_name: 'Pacific Greens Ltd',
    facility_voltage: '220-240V',
    shipping_address: 'Building 4, Pukekohe Agri-Park, Auckland, NZ',
    total_amount: 8450.00,
    items: [
      { id: '1', name: 'MultiGrow Commercial Controller (v2.4)', quantity: 1, price: 4200, category: 'controllers' },
      { id: '2', name: 'IntelliDose Tri-Pump Skid Assembly', quantity: 1, price: 3400, category: 'hardware' },
      { id: '3', name: 'Submersible Glass EC Probe', quantity: 3, price: 283.33, category: 'parts' }
    ],
    status: 'processing',
    notes: 'Requires NZ 240V 50Hz single phase wiring certifications',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'ord-2',
    order_number: 'AG-2026-7729',
    customer_name: 'Elena Rostova',
    customer_email: 'elena@nordicagri.se',
    customer_phone: '+46 8 505 1200',
    company_name: 'Nordic AeroFarms AB',
    facility_voltage: '220-240V',
    shipping_address: 'Västerås Greenhouse Complex 12, Sweden',
    total_amount: 4980.00,
    items: [
      { id: '4', name: 'IntelliClimate Indoor Controller', quantity: 1, price: 3800, category: 'controllers' },
      { id: '5', name: 'Aspiration Fan Aspirated Box', quantity: 2, price: 590, category: 'hardware' }
    ],
    status: 'pending',
    notes: 'Urgent express air courier to Stockholm Arlanda',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

const SEED_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-1',
    name: 'David Chen',
    email: 'david@apexplants.sg',
    subject: 'Bulk Quote for 10 Hectare Tomato Skids',
    category: 'quote_inquiry',
    message: 'We are expanding our Singapore rooftop farm by 10 hectares and require a complete commercial fertigation schedule with Modbus TCP integration.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'inq-2',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@botanylab.org',
    subject: 'EC Mini Calibration Drift Guidance',
    category: 'technical_support',
    message: 'Our EC Mini probe shows +/- 0.15 mS drift after 4 months in high salt calcium nitrate tanks. Need re-calibration procedure and buffer solution part numbers.',
    status: 'in_progress',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

function getLocalOrders(): CustomerOrder[] {
  const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(SEED_ORDERS));
    return SEED_ORDERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_ORDERS;
  }
}

function saveLocalOrders(orders: CustomerOrder[]) {
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
}

function getLocalInquiries(): CustomerInquiry[] {
  const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(SEED_INQUIRIES));
    return SEED_INQUIRIES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_INQUIRIES;
  }
}

function saveLocalInquiries(inquiries: CustomerInquiry[]) {
  localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(inquiries));
}

// ORDER SERVICES
export async function createOrder(orderData: Omit<CustomerOrder, 'id' | 'created_at'>): Promise<CustomerOrder> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Supabase createOrder error:', error);
      throw error;
    }
    return data as CustomerOrder;
  }

  // Local fallback
  const newOrder: CustomerOrder = {
    ...orderData,
    id: 'ord-' + Date.now(),
    created_at: new Date().toISOString()
  };
  const current = getLocalOrders();
  saveLocalOrders([newOrder, ...current]);
  return newOrder;
}

export async function fetchAllOrders(): Promise<CustomerOrder[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetchAllOrders error:', error);
      throw error;
    }
    return data as CustomerOrder[];
  }

  return getLocalOrders();
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
    return;
  }

  const current = getLocalOrders();
  const updated = current.map(o => o.id === orderId ? { ...o, status } : o);
  saveLocalOrders(updated);
}

// INQUIRIES & FEEDBACK SERVICES
export async function submitInquiry(inquiryData: Omit<CustomerInquiry, 'id' | 'created_at' | 'status'>): Promise<CustomerInquiry> {
  const payload = {
    ...inquiryData,
    status: 'new' as const
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Supabase submitInquiry error:', error);
      throw error;
    }
    return data as CustomerInquiry;
  }

  const newInquiry: CustomerInquiry = {
    ...payload,
    id: 'inq-' + Date.now(),
    created_at: new Date().toISOString()
  };
  const current = getLocalInquiries();
  saveLocalInquiries([newInquiry, ...current]);
  return newInquiry;
}

export async function fetchAllInquiries(): Promise<CustomerInquiry[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetchAllInquiries error:', error);
      throw error;
    }
    return data as CustomerInquiry[];
  }

  return getLocalInquiries();
}

export async function updateInquiryStatus(inquiryId: string, status: CustomerInquiry['status'], admin_notes?: string): Promise<void> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('inquiries')
      .update({ status, admin_notes, updated_at: new Date().toISOString() })
      .eq('id', inquiryId);

    if (error) throw error;
    return;
  }

  const current = getLocalInquiries();
  const updated = current.map(i => i.id === inquiryId ? { ...i, status, admin_notes: admin_notes ?? i.admin_notes } : i);
  saveLocalInquiries(updated);
}
