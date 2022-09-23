import Navbar from "./components/Navbar";
import UserHome from "./pages/UserHome";
import Users from "./pages/Users";
import Error from "./pages/Error";
import ShoppingList from "./pages/ShoppingList";
import Responsibilities from "./pages/Responsibilities";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<UserHome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
          <Route path="/responsibilities" element={<Responsibilities />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
