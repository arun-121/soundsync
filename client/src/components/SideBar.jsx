import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export function SideBar() {
  const navigate = useNavigate();
  return (
    <Card
      style={
        {
          // background: "rgba(0, 0, 0, 0.25)",
        }
      }
      className=" rounded-none bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-custom h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex-col"
    >
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          SoundSync
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/room");
          }}
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Group Room
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
export default SideBar;
