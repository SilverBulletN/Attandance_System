import { useEffect, useState } from "react";
import TotalCard from "../components/layout/totalCard";
import AttendeeTable from "@/components/layout/attendeeTable";
import logo from "../assets/logo.png";
import axios from "axios";
import { Attendee } from "@/types/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

const TotalDelegates = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  // Fetch initial state when component mounts
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/students/get-init-state`
        );
        const attendeesData: Attendee[] = response.data.data.student_info;
        setAttendees(attendeesData);
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }
    };

    fetchInitialState();

    // Setup WebSocket connection after fetching initial state
    // const webSocket = new WebSocket("ws://localhost:8080/api/students/ws");
    const webSocket = new WebSocket(`${WS_BASE_URL}/api/students/ws`);

    webSocket.onmessage = (event) => {
      console.log("WebSocket Message:", event.data);

      // Parse the JSON data from the event
      const data = JSON.parse(event.data);

      // Extract student_info as newAttendee
      const newAttendee: Attendee = data.student_info;

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
      <div className="w-full lg:w-1/2 flex flex-col items-center mb-4 lg:mb-0 px-4 py-4">
        <div
          className="flex flex-col items-center mb-4 rounded-t-lg p-1"
          style={{
            color: "#1961ad",
          }}
        >
          {/* Logo and additional labels */}
          <div className="text-center">
            <img src={logo} alt="Logo" className="h-32 mb-2 mx-auto" />
            <p className="text-base font-bold">
              ĐẠI HỘI ĐẠI BIỂU ĐOÀN TNCS HỒ CHÍ MINH
            </p>
            <p className="text-base font-bold">
              KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH
            </p>
            <p className="text-base font-light">
              LẦN THỨ XIV, NHIỆM KỲ 2024 - 2027
            </p>
          </div>
        </div>
        <TotalCard count={attendees.length} />
      </div>

      {/* Right Column for the list of AttendeeCards with label */}
      <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
        <div className=" w-500">
          <AttendeeTable attendees={attendees} />
        </div>
      </div>
    </div>
  );
};

export default TotalDelegates;
