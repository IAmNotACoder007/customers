import { atom } from "jotai";

import { CustomerData } from "./typings";

export const customerFormAtom = atom<CustomerData>({
  id: "",
  name: "",
  address: "",
  phone: "",
  dob: null,
  email: "",
  altPhone: "",
});
