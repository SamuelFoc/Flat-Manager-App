import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import UserCard from "../components/UserCard";

export default function Home() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        isMounted && setUsers(response.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <div>
      <h3 className="color-light ms-3">My roommates</h3>
      <div className="usersBox mt-3 py-5">
        {users?.length ? (
          users.map((user, i) => <UserCard key={i} info={user} />)
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
}
