import logo from "../img/iyte_logo-tur.png";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import { useSelector } from "react-redux";

const getURL = "http://localhost:5000/api/allcandidates/";
const setUserVoted = "http://localhost:5000/api/userset";

function VoteCandidate() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || false);
  const [database, setDatabase] = useState([]); // Initialize as an empty array

  const logout = () => {
    localStorage.setItem("auth", false);
    setAuth(false);
  };

  const currentID = localStorage.getItem("currentID");

  const handleVoteToggle = async () => {
    fetch(getURL)
      .then((response) => response.json())
      .then((data) => {
        setDatabase(data); // Set the fetched data to the database state
        // Store the fetched data for later use
        localStorage.setItem("fetchedData", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    setAuth(isAuthenticated);

    fetch(getURL)
      .then((response) => response.json())
      .then((data) => {
        setDatabase(data); // Set the fetched data to the database state
        // Store the fetched data for later use
        localStorage.setItem("fetchedData", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const storedData = localStorage.getItem("fetchedData");

  // Parse the stored data back into an object
  const data = storedData ? JSON.parse(storedData) : null;

  if (!auth) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div>
        <div className="flex space-x-5 h-15 bg-red-700 sticky top-0 z-50">
          <a href="/dashboard">
            <img src={logo} alt="logo" className="logo" />
          </a>

          <h1 className="text-4xl pt-3 w-2/4 text-white">
            IZTECH Student <br />
            Representative Election System
          </h1>
          <div className="navbox right-0 top-0 inset-y-0 pr-6 pt-8 absolute">
            <div className="">
              <Button fn={logout}>Log out</Button>
            </div>
            <div className=" pt-2">
              <a href="/dashboard">
                <Button>Back</Button>
              </a>
            </div>
          </div>
        </div>
        <form>
          <div className="candidate-container">
            {data && data.length > 0 ? (
              <div className="candidate-list">
                {data.map((candidate) => (
                  <div className="test-container">
                    <img
                      src={`data:image/png;base64, ${candidate.image}`}
                      alt="Base64 Image"
                    />
                    <div className="vl"></div>
                    <div key={candidate.id} className="candidate-info2">
                      <p>
                        <span style={{ fontWeight: "bold", color: "#9a0e20" }}>
                          Name:
                        </span>{" "}
                        {candidate.name}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", color: "#9a0e20" }}>
                          Surname:
                        </span>{" "}
                        {candidate.surname}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", color: "#9a0e20" }}>
                          Student Number:
                        </span>{" "}
                        {candidate.studentnumber}
                      </p>
                    </div>

                    <div className="vl"></div>
                    <input
                      className="checkbox-vote"
                      type="radio"
                      name="candidate-selection"
                      value={candidate.id}
                      style={{ transform: "scale(3)" }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No candidate data available.</p>
            )}
          </div>
          {
            <button
              type="submit"
              className="submit-button"
              id="login-form-submit"
              onClick={handleVoteToggle}
            >
              Submit
            </button>
          }
        </form>
      </div>
    );
  }
}

export default VoteCandidate;
