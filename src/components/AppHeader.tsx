import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { CustomerForm } from "./CustomerForm";
import { useCallback, useState } from "react";
import { CustomerData } from "../typings";

export function AppHeader() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (customerData) => {
      return axios.post("/api/customers", customerData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
  const handleSubmit = useCallback(
    (data: CustomerData) => {
      return mutation.mutateAsync({ ...data, id: uuidv4() } as any);
    },
    [mutation]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Customers
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>
            Add Customer
          </Button>
        </Toolbar>
      </AppBar>
      {open && <CustomerForm onSubmit={handleSubmit} onClose={handleClose} />}
    </Box>
  );
}
