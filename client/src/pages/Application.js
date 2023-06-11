import logo from "../img/iyte_logo-tur.png";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import { auth } from "./LoginPage";
import axios from "axios";
const addURL = "http://localhost:5000/api/addapplication/";

function Application() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || false);
  const logout = () => {
    localStorage.setItem("auth", false);
    setAuth(false);
  };

  const [candidateData, setCandidateData] = useState([]);

  const [info, setInfo] = useState({
    name: "",
    surname: "",
    studentnumber: "",
    tc: "",
    description: "",
    image: null,
    transcript: null,
    criminalrecords: null,
  });

  const handleNameChange = (e) => {
    setInfo({
      ...info,
      name: e.target.value,
    });
  };

  const handleSurnameChange = (e) => {
    setInfo({
      ...info,
      surname: e.target.value,
    });
  };

  const handleStudentNumberChange = (e) => {
    setInfo({
      ...info,
      studentnumber: e.target.value,
    });
  };

  const handleTCChange = (e) => {
    setInfo({
      ...info,
      tc: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setInfo({
      ...info,
      description: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setInfo((prevInfo) => ({
          ...prevInfo,
          image: {
            file,
            base64: reader.result,
          },
        }));
      };
    }
  };

  const handleTranscriptChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setInfo((prevInfo) => ({
          ...prevInfo,
          transcript: {
            file,
            base64: reader.result,
          },
        }));
      };
    }
  };

  const handleCriminalRecordsChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setInfo((prevInfo) => ({
          ...prevInfo,
          criminalrecords: {
            file,
            base64: reader.result,
          },
        }));
      };
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    setAuth(isAuthenticated);
  }, []);

  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const addApplication = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      console.log("Sending application:", info);
      const response = await fetch(addURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: info.name,
          surname: info.surname,
          studentnumber: info.studentnumber,
          tc: info.tc,
          description: info.description,
          image: info.image ? info.image.base64 : null,
          transcript: info.transcript ? info.transcript.base64 : null,
          criminalrecords: info.criminalrecords
            ? info.criminalrecords.base64
            : null,
        }),
      });
      const data = await response.json(); // Parse the response JSON data
      console.log("Application added successfully:", data);
      // Reset the form or perform any necessary actions
    } catch (error) {
      console.error("Error adding application:", error);
      // Handle the error appropriately
    }
  };

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
                <Button>back</Button>
              </a>
            </div>
          </div>
        </div>
        <div className="grid h-screen place-items-center">
          <form className="flex flex-col items-center justify-start w-1/2 h-5/8">
            <input
              type="text"
              placeholder="Name"
              className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg"
              value={info.name}
              onChange={handleNameChange}
            />

            <input
              type="text"
              placeholder="Surname"
              className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg"
              value={info.surname}
              onChange={handleSurnameChange}
            />

            <input
              type="text"
              placeholder="Student number"
              className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg"
              value={info.studentnumber}
              onChange={handleStudentNumberChange}
            />

            <input
              type="text"
              placeholder="TC"
              className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg"
              value={info.tc}
              onChange={handleTCChange}
            />

            <textarea
              placeholder="Description"
              className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg"
              value={info.description}
              onChange={handleDescriptionChange}
            />

            <div className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg flex items-center justify-between">
              <span className="overflow-hidden truncate">
                {info.image ? (
                  <span>Image Uploaded: {info.image.file.name}</span>
                ) : (
                  <span>Upload an Image</span>
                )}
              </span>
              <label
                htmlFor="imageUpload"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Browse
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg flex items-center justify-between">
              <span className="overflow-hidden truncate">
                {info.transcript ? (
                  <span>Transcript Uploaded: {info.transcript.file.name}</span>
                ) : (
                  <span>Upload Transcript</span>
                )}
              </span>
              <label
                htmlFor="transcriptUpload"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Browse
              </label>
              <input
                type="file"
                id="transcriptUpload"
                accept=".pdf"
                className="hidden"
                onChange={handleTranscriptChange}
              />
            </div>

            <div className="w-3/4 h-16 p-2 m-2 border-2 border-gray-300 rounded-lg flex items-center justify-between">
              <span className="overflow-hidden truncate">
                {info.criminalrecords ? (
                  <span>
                    Criminal Records Uploaded: {info.criminalrecords.file.name}
                  </span>
                ) : (
                  <span>Upload Criminal Records</span>
                )}
              </span>
              <label
                htmlFor="criminalRecordsUpload"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Browse
              </label>
              <input
                type="file"
                id="criminalRecordsUpload"
                accept=".pdf"
                className="hidden"
                onChange={handleCriminalRecordsChange}
              />
            </div>

            <button
              className="w-3/4 h-16 p-2 m-2 text-white bg-blue-500 rounded-lg"
              onClick={addApplication}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Application;
