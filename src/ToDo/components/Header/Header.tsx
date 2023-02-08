import "./Header.css";
import { Button, Switch } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";

interface IProps {
  showNews: () => void;
  isNewsVisible: boolean;
}

function Header({ isNewsVisible, showNews }: IProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="todo__header">
      <h1 className="todo__title">To Do</h1>
      <Button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        <SettingsOutlinedIcon style={{ color: "#F4F4F4" }} fontSize="large" className="todo__settings_icon" />
      </Button>
      {isSettingsOpen && (
        <div className="todo__settings">
          Показать новость
          <Switch onChange={showNews} defaultChecked={isNewsVisible} />
        </div>
      )}
    </div>
  );
}

export default Header;
