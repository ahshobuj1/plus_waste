import { LoadTier } from './pricing';

export interface UploadedFile {
  name: string;
  type: 'image' | 'video';
  url: string;
  file?: File;
}

export interface TimeSlotOption {
  v: string;
  label: string;
  fee: number;
  min: number;
}

export interface BookingState {
  postcode: string;
  address: string;
  types: string[];
  place: 'inside' | 'outside' | '';
  floor: string;
  access: string;
  spot: string;
  files: UploadedFile[];
  noPhotos: boolean;
  load: LoadTier | null;
  items: Record<string, number>;
  addonsSeen?: boolean;
  labour: string;
  dis: string | null;
  disN: number;
  date: Date | null;
  slot: TimeSlotOption | null;
  park: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  notes: string;
  ctype: 'Residential' | 'Business' | 'Other' | '';
  acct: 'guest' | 'account' | 'sub' | '';
  signedIn: string;
  pay: string;
}

export interface QuoteLine {
  k: string;
  v: string;
  mute?: boolean;
  off?: boolean;
  shop?: boolean;
}

export interface QuoteResult {
  total: number;
  lines: QuoteLine[];
  priced: boolean;
  shop: number;
}

export interface BookingPayload {
  ref: string;
  status: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  date: string;
  slot: string;
  wasteTypes: string;
  place: string;
  labour: string;
  vanSize: string;
  addons: string;
  dismantle: string;
  parking: string;
  photoCount: string;
  total: string;
  notes: string;
  accountType: string;
  shopItems: string;
  shopTotal: string;
  priority: string;
}
