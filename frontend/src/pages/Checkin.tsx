import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import CardDetail from "../components/layout/cardDetail";
import AttendeeCard from "../components/layout/attendeeCard";
import logo from "../assets/logo.png";
import axios from "axios";
import tableAttandees from "../assets/table_attendees.png";
import frame from "../assets/frameButton.png";
import { Attendee } from "@/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Mock data for attendees

const Checkin = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [fullAttendees, setFullAttendees] = useState<Attendee[]>([]);

  const [inputId, setInputId] = useState("");

  // Fetch initial state when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [initialStateResponse, allStudentsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/students/get-init-state`),
          axios.get(`${API_BASE_URL}/api/students/get-all-students`),
        ]);
        setAttendees(initialStateResponse.data.data.student_info);
        setFullAttendees(allStudentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleCheckOut = async (attendeeId: bigint) => {
  //   try {
  //     await axios.put(`${API_BASE_URL}/api/students/checkin-out`, {
  //       student_id: attendeeId.toString(),
  //     });
  //     console.log(`${attendeeId.toString()} Checked-out`);
  //     setAttendees((prev) => prev.filter((a) => a.student_id !== attendeeId));
  //   } catch (error) {
  //     console.error("Error checking in/out:", error);
  //   }
  // };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchAndAddAttendee();
  };

  const fetchAndAddAttendee = () => {
    // Convert inputId to BigInt and then to String for serialization
    const requestBody = {
      student_id: parseInt(inputId),
    };

    axios
      .put(`${API_BASE_URL}/api/students/checkin-out`, requestBody)
      .then((response) => {
        if (response.status === 200) {
          // Use find to get the single attendee with the matching student_id
          // const studentIdInt = parseInt(inputId);
          // console.log(fullAttendees);
          const newAttendee = fullAttendees.find(
            (attendee) => attendee.student_id == inputId
          );
          if (newAttendee) {
            setAttendees((prevAttendees) => {
              const filteredAttendees = prevAttendees.filter(
                (attendee) => attendee.student_id != inputId
              );
              return [...filteredAttendees, newAttendee];
            });
            console.log(newAttendee);
          } else {
            console.log(`No attendee found with student_id ${inputId}`);
          }
        } else {
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

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const buttonStyle = {
    backgroundImage: `url('${frame}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: isHovering ? "brightness(1.1)" : "none",
  };

  return (
    <div className="p-4 pt-10 flex flex-wrap lg:flex-nowrap">
      {/* Left Column for the most recent attendee's details */}
      <div className="w-full lg:w-1/2 flex flex-col items-center mb-4 lg:mb-0 px-4 py-4">
        <div className="p-3 mt-20">
          {attendees.length > 0 ? (
            <CardDetail
              name={attendees[attendees.length - 1].name}
              id={attendees[attendees.length - 1].student_id}
              classGroup={attendees[attendees.length - 1].class}
            />
          ) : (
            // Display this CardDetail if there are no attendees
            <CardDetail name={""} id={""} classGroup={""} />
          )}
        </div>
        {/* Empty space filler */}
        {/* <div className="flex-grow"></div> */}
        <form
          onSubmit={handleFormSubmit}
          className="w-full px-4 pl-9 mt-8 pt-9"
        >
          <div
            className="flex border-2 border-gray-300 rounded-lg overflow-hidden"
            style={{
              borderStyle: "solid", // CamelCase formatting for JSX inline styles
              borderWidth: "3px", // Border width as a string
              borderColor: "#429fcd", // Correctly formatted color hex code
              borderRadius: "10px",
              color: "#1961ad",
            }}
          >
            <input
              type="text"
              value={inputId}
              onChange={handleInputChange}
              placeholder="Nhập MSSV"
              className="p-2 flex-grow"
            />
            <button
              type="submit"
              className="text-white font-bold py-2 px-3 transition-all duration-150 ease-in-out"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              CHECK-IN
            </button>
          </div>
        </form>
      </div>

      {/* Right Column for the list of AttendeeCards with label */}
      <div className="w-full lg:w-1/2 px-4 rounded-lg">
        <div
          className="flex flex-col items-center mb-4  rounded-t-lg p-1"
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

        {/* Attendee list container */}
        <div
          className="w-3/4 container mx-auto flex flex-wrap lg:flex-nowrap"
          style={{
            backgroundImage: `url(${tableAttandees})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full mx-2 mt-9 mb-2 px-18 rounded-lg overflow-hidden">
            {/* Iterate over attendees and render AttendeeCard for each */}
            {attendees
              .slice(-5)
              .reverse()
              .map((attendee) => (
                <AttendeeCard
                  key={attendee.student_id}
                  id={attendee.student_id}
                  name={attendee.name}
                  // class={attendee.class}
                  // isCheckOut={attendee.checkout}
                  // onCheckOut={handleCheckOut}
                />
              ))}

            {/* Render empty slots if there are fewer than 5 attendees */}
            {Array.from({ length: 5 - attendees.length }, (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="w-full"
                style={{ height: "68px" }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkin;
