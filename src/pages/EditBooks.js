import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";

const EditBooks = () => {
  const [bookName, setBookName] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImageUrl, setBookImageUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const EditableBook = useBookStore((state) =>
    state.bookData.find((book) => book.id === parseInt(id))
  );
  const EditBookAPICall = useBookStore((state) => state.EditBookAPI);

  useEffect(() => {
    if (EditableBook) {
      // Set initial values based on the book data
      setBookName(EditableBook.name || "");
      setBookPrice(EditableBook.price || "");
      setBookImageUrl(EditableBook.image || "");
    }
  }, [EditableBook]);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      id: id,
      name: bookName,
      image: bookImageUrl,
      price: bookPrice,
    };
    console.log(payload);
    await EditBookAPICall(payload);
    navigate(`/`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} mb={2}>
          <TextField
            label="Book Name"
            variant="outlined"
            onChange={(e) => handleChange(e, setBookName)}
            value={bookName}
            style={{ width: "300px" }}
          />
          <TextField
            label="Book Price"
            variant="outlined"
            onChange={(e) => handleChange(e, setBookPrice)}
            value={bookPrice}
            style={{ width: "300px" }}
          />
          <TextField
            label="Book Image URL"
            variant="outlined"
            onChange={(e) => handleChange(e, setBookImageUrl)}
            value={bookImageUrl}
            style={{ width: "300px" }}
          />
        </Stack>
        <Button onClick={() => navigate(`/`)}>Back</Button>
        <Button type="submit" style={{ marginLeft: "180px" }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
