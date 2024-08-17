import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars() {
  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
    </div>
  );
}
