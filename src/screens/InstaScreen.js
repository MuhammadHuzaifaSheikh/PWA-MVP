import React from "react";
import Timeline from "../components/Timeline/Timeline";
import BottomNav from "../components/BottomNav/BottomNav";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function InstaScreen() {
  return (
    <div>
      <div className="insta-header">
        <div className="insta-search">
          <SearchIcon style={{ color: "#c2c2c2" }} />
          <input type="text" />
        </div>
        <div>
          <Link to="/settingscreen">
            <img
              className="avatar-img"
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              alt="avatar"
            />
          </Link>
        </div>
      </div>
      <div className="insta-li">
        <ul>
          <li className="active">Popular</li>
          <li className="">Topic1</li>
          <li className="">Topic2</li>
          <li className="">Topic2</li>
          <li className="">Topic2</li>
        </ul>
      </div>
      <div className="instascreen">
        <Timeline />
      </div>
      <BottomNav />
    </div>
  );
}
