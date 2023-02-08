import axios, { AxiosResponse } from "axios";
import { ITodosResponse } from "../store/TodoStore";

export class TodoProvider {
  getAllTodos(): Promise<AxiosResponse<ITodosResponse>> {
    return axios.get("https://dummyjson.com/todos");
  }

  changeTodoDoneState(id: number, isDone: boolean): Promise<AxiosResponse<ITodosResponse>> {
    return axios.put(`https://dummyjson.com/todos/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: isDone,
      }),
    });
  }

  getRandomNews(): Promise<AxiosResponse<any>> {
    return axios.get("https://dummyjson.com/posts/1");
  }
}
