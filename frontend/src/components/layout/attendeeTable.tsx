import backgroundImage from "../../assets/table_background.png"; // Ensure this path is correct
import { Attendee } from "@/types/types";
type AttendeeTableProps = {
  attendees: Attendee[];
};

const AttendeeTable: React.FC<AttendeeTableProps> = ({ attendees }) => {
  return (
    <div
      className="overflow-x-auto relative sm:rounded-lg mt-20 pt-12 px-2"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: "500px",
      }}
    >
      <table className="text-sm text-left text-gray-500 rounded-lg overflow-hidden">
        <tbody
          style={{ minHeight: "400px", color: "#1961ad" }}
          className="pt-4"
        >
          {attendees
            .slice(-10)
            .reverse()
            .map((attendee, index) => (
              <tr key={index} className="">
                <td
                  className={`py-2 text-center text-xl ${
                    index === 0 ? "font-bold" : "font-medium"
                  }`}
                  style={{ width: "340px" }}
                >
                  {" "}
                  {/* Conditional styling for font weight */}
                  {attendee.name}
                </td>
                <td
                  className={`py-2 text-center text-xl ${
                    index === 0 ? "font-bold" : "font-medium"
                  }`}
                  style={{ width: "160px" }}
                >
                  {" "}
                  {/* Conditional styling for font weight */}
                  {attendee.student_id}
                </td>
              </tr>
            ))}
          {Array.from({ length: 10 - attendees.length }, (_, i) => (
            <tr key={`empty-${i}`} className="">
              <td className="py-3 px-4">&nbsp;</td>
              <td className="py-3 px-4">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeeTable;
