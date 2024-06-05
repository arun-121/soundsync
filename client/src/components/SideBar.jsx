import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Home, Users, LogOut } from "lucide-react";
import "../index.css";
import { signOut } from "firebase/auth";
import { auth } from "../config/configuration";
import { useAuthContext } from "./context/AuthProvider";

export function SideBar() {
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Card className=" sidebar    rounded-none bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-custom h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex-col">
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mt-5 mb-7 text-4xl"
          style={{ textShadow: "4px 3px 34px rgba(142,255,251,1)" }}
        >
          SoundSync
        </Typography>
      </div>
      <List className="flex gap-12 ">
        <ListItem
          className="hover:scale-110 transition duration-500 hover:bg-cyan-400/50 rounded-md"
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="flex gap-4">
            <div>
              <Home color="#ffffff" />
            </div>
            <div>Home</div>
          </div>
        </ListItem>
        <ListItem
          className="hover:scale-110 transition duration-500 smoothTransistion rounded-md"
          onClick={() => {
            navigate("/room");
          }}
        >
          <div className="flex gap-4">
            <div>
              <Users color="#ffffff" />
            </div>
            <div>Join Room</div>
          </div>
        </ListItem>
        <ListItem
          className="hover:scale-110 transition duration-500 smoothTransistion rounded-md"
          onClick={() => {
            const modal = document.querySelector(".modal");
            modal.showModal();
          }}
        >
          <div className="flex gap-4">
            <div>
              <LogOut color="#ffffff" />
            </div>
            <div>Sign out</div>
          </div>
        </ListItem>
        <div className="flex  absolute bottom-3 gap-1">
          <div>
            <img
              src={localStorage.getItem("profile")}
              alt=""
              width={"40px"}
              height={"40px"}
              style={{ borderRadius: "100px" }}
            />
          </div>
          <div>
            <p>{localStorage.getItem("email")}</p>
            <h2>{localStorage.getItem("name")}</h2>
          </div>
        </div>
        <dialog className="bg-gradient-to-r from-gray-900 via-gray-900 to-black modal p-5 text-white rounded-[10px]">
          <h1 className="text-lg font-bold mb-4">
            Are you sure you want to sign out?
          </h1>
          <div className="flex justify-between">
            <button
              className="bg-transparent border border-solid border-white px-4 py-2 text-white rounded-md mr-2  hover:scale-110 transition duration-300 hover:bg-green-600 hover:border-black"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate("/login");
                    window.audioElement.src = "";
                    setIsLoggedIn(false);
                    localStorage.clear();
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Sign Out
            </button>
            <button
              className="bg-transparent border border-solid border-white px-4 py-2 text-white rounded-md hover:scale-110 transition duration-300 hover:bg-red-600 hover:border-black"
              onClick={() => document.querySelector(".modal").close()}
            >
              Close
            </button>
          </div>
        </dialog>
      </List>
    </Card>
  );
}
export default SideBar;
