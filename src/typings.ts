export interface CustomerData {
  id: string;
  name: string;
  address: string;
  phone: string;
  dob: Date | null;
  email: string;
  altPhone?: string;
}

export interface CustomerDataErrors {
  name: string;
  address: string;
  phone: string;
  dob: string;
  email: string;
  altPhone?: string;
}
