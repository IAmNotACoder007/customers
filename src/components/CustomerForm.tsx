import { Formik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAtom } from "jotai";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { customerFormAtom } from "../Atom";
import { validateForm } from "../Helpers/FormHelpers";
import "./CustomerForm.css";
import { CustomerData } from "../typings";

export interface CustomerFormProp {
  onSubmit?: (data: CustomerData) => Promise<any>;
  onClose: () => void;
}

export function CustomerForm(props: CustomerFormProp) {
  const [customerDetails] = useAtom(customerFormAtom);
  const { onSubmit, onClose } = props;

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={customerDetails}
          validate={validateForm}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              try {
                if (onSubmit) await onSubmit(values);
                setSubmitting(false);
              } catch (error) {
                console.log("Error while submitting the form", error);
              } finally {
                onClose();
              }
            }, 400);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="customer-form" onSubmit={handleSubmit}>
              <TextField
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={!!errors.name}
                label="Name"
                helperText={errors.name}
              />
              <TextField
                type="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={!!errors.address}
                label="Address"
                helperText={errors.address}
                multiline
              />
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!errors.email}
                label="Email"
                helperText={errors.email}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={dayjs(values.dob)}
                  slotProps={{
                    textField: {
                      helperText: errors.dob,
                      name: "dob",
                      error: !!errors.dob,
                    },
                  }}
                  onChange={(value) =>
                    handleChange({ target: { name: "dob", value } })
                  }
                />
              </LocalizationProvider>

              <TextField
                type="phone"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={!!errors.phone}
                label="Phone Number"
                helperText={errors.phone}
              />

              <TextField
                type="altPhone"
                name="altPhone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.altPhone}
                label="Alternate Phone Number"
                error={!!errors.altPhone}
                helperText={errors.altPhone}
              />

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
