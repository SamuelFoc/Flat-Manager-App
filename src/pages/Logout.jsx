import React, { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/logout").then(() => {
      setAuth({});
    });
  }, [axiosPrivate]);

  return (
    <div className="text-light">
      <h1>Loged Out</h1>
    </div>
  );
};

export default Logout;
