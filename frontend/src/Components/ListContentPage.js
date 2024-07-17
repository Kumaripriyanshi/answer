import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Alert from "./Alert";
import Spinner from "./Spinner";
const ListContentPage = () => {
  const [listContent, setListContent] = useState([]);
  const { listId } = useParams();
  const [success, setSuccess] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [spinner, setSpinner] = useState(false);

  const fetchContent = async () => {
    const { data } = await axios.get(`/api/lists/listpage/${listId}`);
    //   console.log("diuiud", data.data.listContent);
    setListContent(data.data.listContent);
  };
  useEffect(() => {
    fetchContent();
    console.log(listContent);
  }, []);

  const handleDelete = async (listContentId) => {
    try {
      let answer = window.prompt("Are You Sure want to delete this Image ? ");
      if (!answer) return;
      setSpinner(true);
      const { data } = await axios.delete(
        `/api/lists/deleteListContent/${listContentId}`
      );

      if (data?.success) {
        fetchContent();
        setSuccess(true);
        setOpenAlert(true);
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Alert
        success={success}
        openAlert={openAlert}
        msg="Successfully Deleted the List Content"
        setOpenAlert={setOpenAlert}
      />
      <Header />
      <Container>
        <Typography className="textClass">
          {" "}
          All the Images In the List{" "}
        </Typography>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {spinner && (
            <div className="spinner-overlay">
              <Spinner />
            </div>
          )}
          <Grid container spacing={2}>
            {listContent.length > 0 ? (
              listContent.map((elem, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Card className="cardClass">
                    <CardMedia
                      component="img"
                      alt="response code image"
                      image={elem.imgLink}
                      title="Response Code Image"
                      sx={{ objectFit: "cover", height: "100%", width: "100%" }}
                    />
                    <CardActions>
                      <Button size="small" onClick={() => {}}>
                        <DeleteOutlineOutlinedIcon
                          onClick={() => {
                            handleDelete(elem._id);
                          }}
                        />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography className="emptyText">
                You have Not added Any Images in the list
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ListContentPage;
