import { useEffect } from "react";
import { useStore } from "../../../hooks/useStore";
import "./ToDoList.css";
import ToDoItem from "../ToDoItem/ToDoItem";
import { observer } from "mobx-react-lite";

function ToDoList() {
  const { TodoStore } = useStore();
  const { loadTodos, todos, generateDates, days, changeTodoDoneState } = TodoStore;
  useEffect(() => {
    if (todos.length <= 1) {
      generateDates();
      loadTodos();
    }
  });

  return (
    <ul className="todo__list">
      {days &&
        days.map((day) => {
          return (
            <ToDoItem
              key={day}
              title={`${day} Tasks`}
              onSwitchChange={changeTodoDoneState}
              todo={todos.filter((todo) => todo.date === day)}
            />
          );
        })}
    </ul>
  );
}

export default observer(ToDoList);
