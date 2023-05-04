import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import "./Spinner.css";

export interface SpinnerProp {
  useBackdrop?: boolean;
}

export function Spinner(props: SpinnerProp) {
  const { useBackdrop } = props;

  if (useBackdrop)
    return (
      <Backdrop
        open
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>
    );
  return (
    <div className="spinner-wrapper">
      <CircularProgress />
    </div>
  );
}
