export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuantity: number;
}
