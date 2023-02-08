import React from "react";
import { TodoProvider } from "../ToDo/provider/TodoProvider";
import { TodoStore } from "../ToDo/store/TodoStore";

export const StoreContext = React.createContext({
  TodoStore: new TodoStore(new TodoProvider()),
});

export const useStore = () => React.useContext(StoreContext);
