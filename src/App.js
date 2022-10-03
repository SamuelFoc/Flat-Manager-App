import Layout from "./components/Layout";
import Login from "./pages/LogIn";
import UserHome from "./pages/UserHome";
import Users from "./pages/Users";
import Error from "./pages/Error";
import RequireAuth from "./auth/RequireAuth";
import Unauthorized from "./auth/Unauthorized";
import ShoppingList from "./pages/ShoppingList";
import Responsibilities from "./pages/Responsibilities";
import Energies from "./pages/Energies";
import { Routes, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import Logout from "./pages/Logout";
import Services from "./pages/Services";
import Events from "./pages/Events";
import Statistics from "./pages/Statistics";

const ROLES = {
  User: "User",
  Editor: "Editor",
  Admin: "Admin",
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Layout />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          >
            <Route path="/home" element={<UserHome />} />
            <Route path="/users" element={<Users />} />
            <Route path="/shoppingList" element={<ShoppingList />} />
            <Route path="/responsibilities" element={<Responsibilities />} />
            <Route path="/energies" element={<Energies />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
