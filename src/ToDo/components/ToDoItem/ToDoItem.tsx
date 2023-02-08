import { ITodo } from "../../store/TodoStore";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import "./ToDoItem.css";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../hooks/useStore";

interface IProps {
  todo: ITodo[];
  title: string;
  onSwitchChange: (id: number, done: boolean) => void;
}

function ToDoItem({ todo, title, onSwitchChange }: IProps) {
  const { TodoStore } = useStore();
  const { todos } = TodoStore;

  useEffect(() => {}, [todos]);

  return (
    <li className="todo__item">
      <Accordion className="todo__item" style={{ borderRadius: 25 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ background: "#F4F4F4", borderRadius: 50 }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="todo__border"></div>
          <Typography className="todo__acc_title">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="todo__info_block">
          {todo.map((todo) => {
            return (
              <Typography className="todo__info_typography" key={todo.id}>
                <div
                  style={{ background: `${!todo.completed ? "#FF0000" : "#10C200"}` }}
                  className="todo__info_border"
                ></div>
                <div className="todo__info_content">
                  <span className="todo__title"> {todo.todo}</span>
                  <span className="todo_status">
                    <Switch
                      onChange={() => {
                        onSwitchChange(todo.id, !todo.completed);
                      }}
                      defaultChecked={todo.completed}
                    />
                  </span>
                </div>
              </Typography>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </li>
  );
}

export default observer(ToDoItem);
