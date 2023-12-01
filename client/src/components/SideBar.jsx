import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Home, Users, LogOut } from "lucide-react";
export function SideBar() {
  const navigate = useNavigate();
  return (
    <Card className=" rounded-none bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-custom h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex-col">
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
      <List className="flex gap-12">
        <ListItem>
          <div className="flex gap-4">
            <div>
              <Home color="#ffffff" />
            </div>
            <div>Home</div>
          </div>
        </ListItem>
        <ListItem
          // className="m-3"
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

        <ListItem>
          <div className="flex gap-4">
            <div>
              <LogOut color="#ffffff" />
            </div>
            <div>Log Out</div>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
export default SideBar;
