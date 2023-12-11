import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  //   const allbooks = useBookStore((state) => state.bookData);
  //   const gellAllBookCall = useBookStore((state) => state.getAllBookAPI);
  //   const callDeleteAPI = useBookStore((state) => state.deleteBookAPI);

  const { bookData, getAllBookAPI, deleteBookAPI } = useBookStore();

  const navigate = useNavigate();

  useEffect(() => {
    getAllBookAPI();
  }, [getAllBookAPI]);

  const handleRemove = (id) => {
    deleteBookAPI(id);
  };
  return (
    <>
      <Button onClick={() => navigate(`add-book`)}>Add Book</Button>
      <Grid container spacing={10}>
        {bookData.map((book) => (
          <Grid item key={book.id} md={3}>
            <Card>
            <CardActionArea>
              <CardMedia
                // component="img"
                image={book.image}
                alt="book image"
                style={{
                  width: "300px",
                  minHeight: "250px",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Price: ${book.price}
                </Typography>
                <Stack direction="row" spacing={16} ml="-12px">
                  <Button onClick={() => navigate(`/edit-book/${book.id}`)}>
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleRemove(book.id);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllBooks;
