import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function cardDetail({ name, id, group, onCheckOut }) {
  return (
    <>
      <div className="flex justify-center items-center">
        {" "}
        {/* `h-screen` ensures the container takes the full viewport height */}
        <img
          alt="Project Image"
          className="rounded-full object-cover w-48 h-48 "
          src="https://th.bing.com/th/id/R.591dce737c1934ec1c449602550fc719?rik=btzoXJc%2bE23SBw&pid=ImgRaw&r=0"
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
          <span className=" text-base">{group}</span>
        </div>
        {/* </div> */}
        {/* </form> */}
        {/* </CardContent> */}
        {/* <CardFooter className="flex justify-end"> */}
        {/* <Button
            onClick={() => onCheckOut(id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            CHECK-OUT
      </Button> */}
        {/* </CardFooter> */}
      </Card>
      {/* <div className="flex justify-center items-center mt-2">

    </div> */}
    </>
  );
}
