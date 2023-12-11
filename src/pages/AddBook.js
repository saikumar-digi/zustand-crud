import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useBookStore } from "../store/bookStore";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImageUrl, setBookImageUrl] = useState("");
  const addCakeAPICall = useBookStore((state) => state.addBookAPI);
  const navigate = useNavigate();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let payload = {
      id: Math.round(Math.random() * 1000000),
      name: bookName,
      image: bookImageUrl,
      price: bookPrice
    };
    await addCakeAPICall(payload);
    navigate(`/`)
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
        <Button onClick={()=>navigate(`/`)}>
          Back
        </Button>
        <Button type="submit" style={{ marginLeft: "180px" }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddBook;
