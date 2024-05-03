import React, { useEffect, useState, ChangeEvent } from "react";
import CardDetail from "../components/layout/cardDetail";
import logo from "../assets/logo.png";
import axios from "axios";
import { Attendee } from "@/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

const AttendeeList: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [chosenAttendee, setChosenAttendee] = useState<Attendee | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const attendeesPerPage = 10; // Fixed number of attendees per page

  const indexOfLastAttendee = currentPage * attendeesPerPage;
  const indexOfFirstAttendee = indexOfLastAttendee - attendeesPerPage;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.student_id.toString().includes(searchQuery)
  );

  const currentAttendees = filteredAttendees.slice(
    indexOfFirstAttendee,
    indexOfLastAttendee
  );

  const chooseAttendee = (attendee: Attendee) => {
    setChosenAttendee(attendee);
  };

  // Fetch initial state when component mounts
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/students/get-init-state`
        );
        setAttendees(response.data.data.student_info); // Assuming the response data is the list of attendees
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }
    };

    fetchInitialState();

    // Setup WebSocket connection after fetching initial state
    const webSocket = new WebSocket(`${WS_BASE_URL}/api/students/ws`);

    webSocket.onmessage = (event) => {
      console.log("WebSocket Message:", event.data);

      // Parse the JSON data from the event
      const data = JSON.parse(event.data);

      // Extract student_info as newAttendee
      const newAttendee = data.student_info;

      setAttendees((prevAttendees) => {
        // Remove any existing attendee that matches the newAttendee's student_id
        const filteredAttendees = prevAttendees.filter(
          (attendee) => attendee.student_id !== newAttendee.student_id
        );

        // Return the new array with the newAttendee added to the end
        return [...filteredAttendees, newAttendee];
      });
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

  return (
    <div className="p-4 pt-10 flex flex-wrap lg:flex-nowrap">
      {/* Left Column for the most recent attendee's details */}
      <div className="w-full lg:w-1/3 flex flex-col items-center mb-4 lg:mb-0 px-4 py-4">
        <div
          className="flex flex-col items-center mb-4 rounded-t-lg p-1"
          style={{
            color: "#1961ad",
          }}
        >
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
        <div className=" ">
          {chosenAttendee ? (
            <CardDetail
              name={chosenAttendee.name}
              id={chosenAttendee.student_id}
              classGroup={chosenAttendee.class}
              // isCheckedOut={attendees[attendees.length - 1].checkout}
              // onCheckOut={() => {}}
            />
          ) : (
            // Display this CardDetail if there are no attendees
            <CardDetail name={""} id={""} classGroup={""} />
          )}
        </div>
      </div>

      {/* Right Column for the list of AttendeeCards with label */}
      <div className="w-full lg:w-2/3 px-4 flex flex-col items-center justify-center">
        {/* Ensure the outer div spans the full width of its parent */}
        <div className="w-full flex justify-end pr-4 mb-4 mt-6">
          <input
            type="text"
            placeholder="Search by Name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <table className="w-full bg-white rounded-lg text-center table-fixed border-collapse border border-gray-300">
          <thead className="bg-gray-200" style={{ backgroundColor: "#429fcd" }}>
            <tr>
              <th className="w-2/12 py-2">No.</th>
              <th className="w-4/12 py-2">Name</th>
              <th className="w-2/12 py-2">ID</th>
              <th className="w-2/12 py-2">Class</th>
              {/* <th className="w-2/12 py-2">Gender</th> */}
              <th className="w-2/12 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentAttendees.map((attendee, index) => (
              <tr key={attendee.student_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 rounded-lg py-1">
                  {indexOfFirstAttendee + index + 1}
                </td>
                <td className="border border-gray-300 rounded-lg py-1">
                  {attendee.name}
                </td>
                <td className="border border-gray-300 rounded-lg py-1">
                  {attendee.student_id}
                </td>
                <td className="border border-gray-300 rounded-lg py-1">
                  {attendee.class}
                </td>
                {/* <td className="border border-gray-300 rounded-lg py-1">
                  {attendee.sex}
                </td> */}
                <td className="border border-gray-300 rounded-lg py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => chooseAttendee(attendee)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination flex justify-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(attendees.length / attendeesPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded hover:bg-gray-100 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(attendees.length / attendeesPerPage)
                )
              )
            }
            disabled={
              currentPage === Math.ceil(attendees.length / attendeesPerPage)
            }
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeList;
