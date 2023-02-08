import { makeAutoObservable } from "mobx";
import { TodoProvider } from "../provider/TodoProvider";
import { makeLoggable } from "mobx-log";
import moment from "moment";

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  date?: string;
}

export interface ITodosResponse {
  limit: number;
  skip: number;
  todos: ITodo[];
  total: number;
}

export interface INews {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export class TodoStore {
  todos: ITodo[] = [{ id: 0, todo: "", completed: false, userId: 0 }];
  days: string[] = [];
  news: INews = {
    id: 1,
    title: "",
    body: "",
    userId: 0,
    tags: [],
    reactions: 0,
  };

  constructor(private TodoProvider: TodoProvider) {
    makeAutoObservable(this);
    makeLoggable(this);
    this.loadTodos = this.loadTodos.bind(this);
    this.generateDates = this.generateDates.bind(this);
    this.changeTodoDoneState = this.changeTodoDoneState.bind(this);
    this.getRandomNews = this.getRandomNews.bind(this);
  }

  generateDates() {
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");
    const days: string[] = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.format("dddd DD/MM"));
      day = day.clone().add(1, "d");
    }
    this.days = days;
  }

  loadTodos() {
    this.TodoProvider.getAllTodos().then((response) => {
      this.todos = response.data.todos.map((todo) => {
        todo["date"] = this.days ? this.days[Math.floor(Math.random() * this.days.length)] : "";
        return todo;
      });
    });
  }

  changeTodoDoneState(id: number, isDone: boolean) {
    this.TodoProvider.changeTodoDoneState(id, isDone).then((response) => {
      console.log(response);
    });
  }

  getRandomNews() {
    this.TodoProvider.getRandomNews().then((response) => {
      this.news = response.data;
    });
  }
}
