import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import React, { useState, useEffect, forwardRef } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useList } from "../Context/listContext";
import { useInput } from "../Context/InputContext";
import { useAuth } from "../Context/authContext";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import { useUserList } from "../Context/userLists";
import MuiAlert from "@mui/material/Alert";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const ShowAllImages = () => {
  const [photos, setPhotos] = useList();
  const [item, setItem] = useState({});
  const [input, setInput] = useInput();
  const [auth, setAuth] = useAuth();
  const [totalList, setTotalList] = useState(0);
  const [add, setAdd] = useState(false);
  const [userList, setUserList] = useUserList([]);
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const [listName, setListName] = React.useState("");
  const handleSave = (elem) => {
    setOpen(true);

    setItem(elem);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveList = async () => {
    console.log(auth.token);
    try {
      const newList = {
        name: listName,
        filter: "",
        code: item.status_code,
        imgLink: item.image.jpg,
      };
      setSpinner(true);
      const data = await axios.post("/api/lists/addLists", newList);
      console.log(data);
      if (data?.data?.success) {
        console.log("Succes");
        setTotalList(data.data.totalList + 1);
        setOpen(false);
        setSuccess(true);
        setOpenAlert(true);
        setSpinner(false);
        navigate("/listpage");
      } else {
        console.log("error ");
      }
    } catch (error) {
      console.log(error);
      setOpen(false);
    }

    console.log("Total ists made by user is ", totalList);
  };

  useEffect(() => {
    const fetchUserList = async () => {
      const data = await axios.get("/api/lists/fetchListsByUserId", {
        headers: {
          authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
        },
      });
      setUserList(data.data.existingList.lists);
      // console.log("data ", userList);
    };
    fetchUserList();
  }, [totalList]);

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
          {success ? "Successfully Added List" : "Failed! to add List"}
        </Alert>
      </Snackbar>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {spinner && (
          <div className="spinner-overlay">
            <Spinner />
          </div>
        )}
        <Grid container spacing={2}>
          {photos &&
            photos.map((elem, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card className="cardClass">
                  <CardMedia
                    component="img"
                    alt="response code image"
                    image={elem.image.jpg}
                    title="Response Code Image"
                    sx={{ objectFit: "cover", height: "100%", width: "100%" }}
                  />
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        handleSave(elem);
                      }}
                    >
                      <BookmarksOutlinedIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Save List
            </Typography>
            <TextField
              fullWidth
              label="List Name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              sx={{ mt: 2, mb: 2 }}
            />
            <Button variant="contained" onClick={handleSaveList}>
              Save
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ShowAllImages;
