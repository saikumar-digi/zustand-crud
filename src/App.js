import { Route, Routes } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import EditBooks from "./pages/EditBooks";


function App() {
  return (
<Routes>
  <Route path="/" element={<AllBooks/>}/>
  <Route path="/add-book" element={<AddBook/>}/>
  <Route path="/edit-book/:id" element={<EditBooks/>}/>
</Routes>
  );
}

export default App;
