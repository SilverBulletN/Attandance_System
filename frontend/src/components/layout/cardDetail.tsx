import { Card } from "@/components/ui/card";
type CardDetailProps = {
  name: string | undefined;
  id: string | undefined;
  classGroup: string | undefined;
};

const CardDetail: React.FC<CardDetailProps> = ({ name, id, classGroup }) => {
  return (
    <>
      <div className="flex justify-center items-center">
        {" "}
        {/* `h-screen` ensures the container takes the full viewport height */}
        <img
          alt="Project Image"
          className="rounded-full object-cover w-48 h-48 "
          src="https://cdn-icons-png.flaticon.com/512/9783/9783993.png"
          style={{
            borderStyle: "solid", // CamelCase formatting for JSX inline styles
            borderWidth: "3px", // Border width as a string
            borderColor: "#429fcd", // Correctly formatted color hex code
          }}
        />
      </div>

      <Card
        className="w-[400px] mt-6 p-6"
        style={{
          borderStyle: "solid", // CamelCase formatting for JSX inline styles
          borderWidth: "3px", // Border width as a string
          borderColor: "#429fcd", // Correctly formatted color hex code
          borderRadius: "25px",
          color: "#1961ad",
        }}
      >
        {/* <CardContent > */}
        {/* <form className="bg-white shadow-lg rounded-lg p-4 py-4 max-w-sm mx-auto"> */}
        <div className="flex items-center gap-2">
          <label htmlFor="name" className="text-base font-semibold">
            HỌ VÀ TÊN:
          </label>
          <span className=" text-base">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="name" className="text-base font-semibold">
            MSSV:
          </label>
          <span className="text-base">{id}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="name" className="text-base font-semibold">
            CHI ĐOÀN:
          </label>
          <span className=" text-base">{classGroup}</span>
        </div>
      </Card>
    </>
  );
};
export default CardDetail;
