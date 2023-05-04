import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Typography } from "@mui/material";

import { CustomerData } from "../typings";
import { Spinner } from "./Feedback/Spinner";
import { Customer } from "./Customer";
import "./Customers.css";

const fetchCustomers = (): Promise<CustomerData[]> =>
  axios
    .get("/api/customers")
    .then((response) => response.data?.customers || []);

export function Customers() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  if (isLoading) return <Spinner />;
  if (!data || !data.length)
    return (
      <Typography sx={{ m: 1 }} variant="h6" component="div">
        No Customers Found
      </Typography>
    );

  if (isError)
    return (
      <Alert severity="error">
        Something went wrong, please try after sometime!
      </Alert>
    );

  return (
    <div className="cutomers-wrapper">
      {(data || []).map((user) => (
        <Customer key={user.id} customer={user} />
      ))}
    </div>
  );
}
