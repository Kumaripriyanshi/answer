import { Slide, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState, forwardRef } from "react";

const Alert = ({ success, openAlert, msg, setOpenAlert }) => {
  //   const [success, setSuccess] = useState(false);
  //   const [openAlert, setOpenAlert] = React.useState(false);

  const vertical = "top";
  const horizontal = "right";

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        {/* <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert> */}
        <Alert
          onClose={handleCloseAlert}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success ? msg : `Failed! to ${msg}`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Alert;
