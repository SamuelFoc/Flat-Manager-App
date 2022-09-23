import React from "react";
import UserCard from "../components/UserCard";

export default function Home() {
  const [myData, setMyData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:4000/users/")
      .then((res) => res.json())
      .then((response) => {
        setMyData(response.data);
      });
  }, []);

  return (
    <div>
      <h3 className="color-light ms-3">My roommates</h3>
      <div className="usersBox mt-3 py-5">
        {myData.map((user) => (
          <UserCard info={user} />
        ))}
      </div>
    </div>
  );
}
