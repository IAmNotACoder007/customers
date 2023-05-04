import { CustomerData, CustomerDataErrors } from "../typings";

const defaultErrors: CustomerDataErrors = {
  address: "",
  dob: "",
  email: "",
  name: "",
  phone: "",
  altPhone: "",
};

export function validateForm(formData: CustomerData) {
  const errors: CustomerDataErrors = defaultErrors;
  errors.name = !formData.name ? "Name is required" : "";
  errors.address = !formData.address ? "Address is required" : "";
  errors.dob = !formData.dob ? "Date of Birth is required" : "";

  errors.email = ""; //reset
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = "Invalid email address";
  }
  errors.phone = ""; // reset
  if (!formData.phone) {
    errors.phone = "Phone number is required";
  } else if (formData.phone.length !== 10) {
    errors.phone = "Invalid phone number";
  }
  errors.altPhone = ""; // reset
  if (formData.altPhone && formData.altPhone.length !== 10) {
    errors.altPhone = "Invalid phone number";
  }
  const hasError = Object.values(errors).some((e) => e);
  return hasError ? errors : {};
}
