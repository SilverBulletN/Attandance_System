// The functional component 'AttendeeCard' defined using arrow function syntax
const AttendeeCard = ({ id, name, group, onCheckOut }) => {
    return (
      <div className="flex items-center justify-between bg-white p-2 shadow-md rounded-lg mb-4">
        <div className="flex flex-col">
          <span className="font-semibold text-blue-800">{name}</span>
          <span className="text-sm text-gray-600">ID: {id}</span>
          {/* Uncomment if group info is needed */}
          {/* <span className="text-sm text-gray-600">Group: {group}</span> */}
        </div>
        <button
          onClick={() => onCheckOut(id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
        >
          CHECK OUT
        </button>
      </div>
    );
  };
  

export default AttendeeCard;
