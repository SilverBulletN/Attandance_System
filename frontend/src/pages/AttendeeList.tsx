import React, { useEffect, useState } from "react";
import CardDetail from "../components/layout/cardDetail";
import AttendeeCard from "../components/layout/attendeeCard";
import logo from "../assets/logo.png";
import axios from "axios";

// Import any necessary components from shadcn/ui if needed, replace with actual imports
// import { CustomCard, CustomButton } from 'shadcn/ui';

// Mock data for attendees

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [fullAttendees, setfullAttendees] = useState([]);
  const [inputId, setInputId] = useState("");

  // Fetch initial state when component mounts
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/students/get-init-state"
        );
        setAttendees(response.data.data.student_info); // Assuming the response data is the list of attendees
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }
    };
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/students/get-all-students"
        );
        setfullAttendees(response.data.data); // Assuming the response data is the list of attendees
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }
    };

    fetchInitialState();
    fetchAllStudents();

    // Setup WebSocket connection after fetching initial state
    const webSocket = new WebSocket("ws://localhost:8080/api/students/ws");

    webSocket.onmessage = (event) => {
      // Assuming the message event data is the new attendee object
      // const newAttendee = JSON.parse(event.data);
      // setAttendees((prevAttendees) => [...prevAttendees, newAttendee]);
    };

    webSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    webSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    webSocket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      webSocket.close();
    };
  }, []);

  const handleCheckOut = (attendeeId) => {
    setAttendees(
      attendees.filter((attendee) => attendee.student_id !== attendeeId)
    );
  };

  const handleInputChange = (event) => {
    setInputId(event.target.value); // Update the inputId state as the user types
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    fetchAndAddAttendee();
  };

  const fetchAndAddAttendee = () => {
    const requestBody = {
      student_id: parseInt(inputId),
    };

    axios
      .put("http://localhost:8080/api/students/checkin-out", requestBody)
      .then((response) => {
        // Handle the response here. If the response contains the new attendee data, use it:
        // if status is 200, search infomation in fullAttendees
        if (response.status === 200) {
          // Use find to get the single attendee with the matching student_id
          const newAttendee = fullAttendees.find(
            (attendee) => attendee.student_id === parseInt(inputId)
          );
          if (newAttendee) {
            // Log the found attendee (for debugging purposes, can be removed in production)
            console.log(newAttendee);
            // Add the new attendee to the existing list
            setAttendees((prevAttendees) => [...prevAttendees, newAttendee]);
          } else {
            // Log a message or handle the case where no attendee was found
            console.log(`No attendee found with student_id ${inputId}`);
          }
        } else {
          // Handle any status codes other than 200
          console.log("Request did not succeed:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error checking in/out:", error);
        console.log(requestBody);
      })
      .finally(() => {
        setInputId(""); // Clear the input field whether the request was successful or not
      });
  };

  return (
    <div className="p-4 pt-10 flex flex-wrap lg:flex-nowrap">
      {/* Left Column for the most recent attendee's details */}
      <div className="w-full lg:w-1/2 flex flex-col items-center mb-4 lg:mb-0 px-4 py-3">
        <div className="p-3 mt-20">
        {
          attendees.length > 0 ? (
            <CardDetail
              name={attendees[attendees.length - 1].name}
              id={attendees[attendees.length - 1].student_id}
              // group={attendees[attendees.length - 1].group}
              onCheckOut={() => handleCheckOut(attendees[attendees.length - 1].student_id)}
            />
          ) : (
            // Display this CardDetail if there are no attendees
            <CardDetail
              name={"Ten dai bieu"}
              id={"MSSV"}
              // group={defaultAttendee.group}
              onCheckOut={() => {}}
            />
          )
        }
        </div>
        {/* Empty space filler */}
        {/* <div className="flex-grow"></div> */}
        <form onSubmit={handleFormSubmit} className="w-full px-4 pl-9 pt-10">
          <div className="flex border-2 border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              value={inputId}
              onChange={handleInputChange}
              placeholder="Enter ID"
              className="p-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            >
              CHECK-IN
            </button>
          </div>
        </form>
      </div>

      {/* Right Column for the list of AttendeeCards with label */}
      <div className="w-full lg:w-1/2 px-4 rounded-lg">
        <div className="flex flex-col items-center mb-4 text-blue-500 rounded-t-lg p-1">
          {/* Logo and additional labels */}
          <div className="text-center">
            <img src={logo} alt="Logo" className="h-24 mb-2 mx-auto" />
            <p className="text-sm font-bold">
              ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH
            </p>
            <p className="text-sm font-bold">
              KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH
            </p>
            <p className="text-sm font-light">
              LẦN THỨ XIV, NHIỆM KỲ 2024 - 2027
            </p>
          </div>
        </div>

        {/* Attendee list container */}
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap">
          {/* Attendee list container with header and attendee cards */}
          <div className="w-full px-20 mx-auto rounded-lg  overflow-hidden ">
            {/* Header */}
            <div className="bg-blue-500 text-white text-2xl font-bold uppercase py-2 text-center rounded-lg mb-4">
              Danh sách Đại Biểu
            </div>
            {/* Attendee cards */}
            {attendees
              .slice(-5)
              .reverse()
              .map((attendee) => (
                <AttendeeCard
                  className="w-full"
                  key={attendee.student_id}
                  id={attendee.student_id}
                  name={attendee.name}
                  group={attendee.group}
                  onCheckOut={handleCheckOut}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeList;
