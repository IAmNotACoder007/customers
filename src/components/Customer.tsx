import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { CustomerData } from "../typings";
import "./Customer.css";
import { useCallback, useState } from "react";
import { useAtom } from "jotai";
import { customerFormAtom } from "../Atom";
import { CustomerForm } from "./CustomerForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface CustomerProp {
  customer: CustomerData;
}

export function Customer(props: CustomerProp) {
  const { customer } = props;
  const { name, address, dob, email, phone, altPhone, id } = customer;
  const [open, setOpen] = useState(false);
  const [, setCustomerDetails] = useAtom(customerFormAtom);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (customerData: CustomerData) => {
      return axios.patch(`/api/customers/${customerData.id}`, customerData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const handleEdit = useCallback(() => {
    setOpen(true);
    setCustomerDetails({
      address,
      dob,
      email,
      id,
      name,
      phone,
      altPhone,
    });
  }, [
    address,
    altPhone,
    dob,
    email,
    id,
    name,
    phone,
    setCustomerDetails,
    setOpen,
  ]);

  const handleSubmit = useCallback(
    (data: CustomerData) => {
      return mutation.mutateAsync(data);
    },
    [mutation]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="customer-wrapper">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.3 }} color="text.secondary">
            Address: {address || "--"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.3 }} color="text.secondary">
            Email: {email || "--"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.3 }} color="text.secondary">
            Date of Birth: {dob?.toLocaleString() || "--"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.3 }} color="text.secondary">
            Phone: {phone || "--"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.3 }} color="text.secondary">
            AltPhone: {altPhone || "--"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEdit}>
            Edit
          </Button>
        </CardActions>
      </Card>
      {open && <CustomerForm onSubmit={handleSubmit} onClose={handleClose} />}
    </div>
  );
}
