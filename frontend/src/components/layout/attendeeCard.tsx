import buttonImage from "../../assets/button.png";
const AttendeeCard = ({ id, name, group, isCheckOut, onCheckOut }) => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex flex-col">
        {name ? (
          <span className="font-semibold text-blue-800">{name}</span>
        ) : (
          <span className="font-semibold text-blue-800"></span>
        )}
        {id ? (
          <span className="text-sm text-gray-600">MSSV: {id}</span>
        ) : (
          <span className="text-sm text-gray-600"></span>
        )}

        {/* Uncomment if group info is needed */}
        {/* <span className="text-sm text-gray-600">Group: {group}</span> */}
      </div>
      <img
        src={buttonImage}
        alt={isCheckOut ? "Checked Out" : "Check Out"}
        onClick={() => !isCheckOut && onCheckOut(id)}
        className={`cursor-pointer ${
          isCheckOut ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
        style={{
          width: "auto", // Adjust width as necessary
          height: "40px", // Adjust height as necessary
        }}
      />
    </div>
  );
};

export default AttendeeCard;
