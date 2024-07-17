import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HomePage from "./HomePage";
import Header from "./Header";
import { useUserList } from "../Context/userLists";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Spinner from "./Spinner";

const ListPage = () => {
  const [userList, setUserList] = useUserList();
  const [open, setOpen] = React.useState(false);
  const [listName, setListName] = React.useState("");
  const [listId, setListId] = useState("");
  const [success, setSuccess] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
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

  const fetchUserList = async () => {
    const data = await axios.get("/api/lists/fetchListsByUserId", {
      headers: {
        authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
      },
    });
    setUserList(data.data.existingList.lists);
    console.log("data ", userList);
  };

  const handleDelete = async (listId) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this list ? ");
      if (!answer) return;
      setSpinner(true);

      const { data } = await axios.delete(`/api/lists/deleteList/${listId}`);

      if (data?.success) {
        fetchUserList();
        setSuccess(true);
        setOpenAlert(true);
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      setSpinner(true);

      const { data } = await axios.put(`/api/lists/updateList/${listId}`, {
        name: listName,
      });

      if (data?.success) {
        fetchUserList();
        setListId("");
        setOpen(false);
        setListName("");
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (listId) => {
    setOpen(true);
    setListId(listId);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Alert
        success={success}
        openAlert={openAlert}
        msg="Successfully Deleted the List"
        setOpenAlert={setOpenAlert}
      />
      <Header />
      <Container>
        <Typography className="textClass">All Your Lists Here !!</Typography>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {spinner && (
            <div className="spinner-overlay">
              <Spinner />
            </div>
          )}
          <Grid container spacing={2}>
            {userList.length > 0 ? (
              userList.map((elem, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Card className="cardClass" style={{ display: "flex" }}>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          navigate(`/listPage/${elem._id}`);
                        }}
                      >
                        {elem.name}
                      </Button>
                    </CardActions>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          handleDelete(elem._id);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                    </CardActions>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          onClick={() => {
                            handleEdit(elem._id);
                          }}
                        />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography className="emptyText">
                No List here Create and Save the List !!
              </Typography>
            )}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit List name
              </Typography>
              <TextField
                fullWidth
                label="Enter New List Name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                sx={{ mt: 2, mb: 2 }}
              />
              <Button variant="contained" onClick={handleUpdate}>
                Save
              </Button>
            </Box>
          </Modal>
        </Box>
      </Container>
    </>
  );
};

export default ListPage;
