import logo from "../img/iyte_logo-tur.png";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const getURL = "http://localhost:5000/api/allnames/";

function LoginPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    localStorage.getItem(localStorage.getItem("auth") || false)
  );

  const [userId, setUserId] = useState("");

  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const handleNameChange = (e) => {
    setInfo({
      ...info,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setInfo({
      ...info,
      password: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a GET request to fetch the user data from the getURL
    fetch(getURL)
      .then((response) => response.json())
      .then((data) => {
        // Check if the entered username and password match any user in the fetched data
        const foundUser = data.find(
          (user) =>
            user.username === info.username && user.password === info.password
        );

        if (foundUser) {
          setAuth(true);
          setUserId(foundUser._id);
          localStorage.setItem("currentID", foundUser._id);
          localStorage.setItem("auth", true);
          navigate("/dashboard");
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    setAuth(isAuthenticated);
  }, []);

  if (auth) {
    return <Navigate replace to="/dashboard" />;
  } else {
    return (
      <div className="grid h-screen place-items-center">
        <div className="flex flex-col items-center justify-center w-11/12 h-5/6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">
            IZTECH Student Representative Election System
          </h1>
          <img src={logo} alt="logo" className="w-1/5 h-1/2 " />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-1/2 h-1/2"
          >
            <input
              value={info.username}
              onChange={handleNameChange}
              type="text"
              placeholder="Username"
              className="w-3/4 h-1/6 p-2 m-2 border-2 border-gray-300 rounded-lg"
            />
            <input
              value={info.password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
              className="w-3/4 h-1/6 p-2 m-2 border-2 border-gray-300 rounded-lg"
            />
            <button className="w-3/4 h-1/6 p-2 m-2 text-white bg-blue-500 rounded-lg">
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export let auth;
export let userId;

export default LoginPage;
