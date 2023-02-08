import "./ToDo.css";
import Header from "./components/Header/Header";
import "./ToDo.css";
import ToDoList from "./components/ToDoList/ToDoList";
import { observer } from "mobx-react-lite";
import Ticker, { NewsTicker } from "nice-react-ticker";
import { useStore } from "../hooks/useStore";
import { useEffect, useState } from "react";

function ToDo() {
  const { TodoStore } = useStore();
  const { getRandomNews, news } = TodoStore;
  useEffect(() => {
    getRandomNews();
  }, []);

  const [isNewsVisible, setIsNewsVisible] = useState(false);

  const handleClick = () => {
    setIsNewsVisible(!isNewsVisible);
  };

  return (
    <div className="todo__container">
      <Header showNews={() => handleClick()} isNewsVisible={isNewsVisible} />
      <ToDoList />
      {isNewsVisible && (
        <Ticker isNewsTicker={true}>
          <NewsTicker
            id={news.id}
            title={news.body}
            url="https://metro.co.uk/2020/02/22/blue-passports-issued-brits-first-time-decades-next-months-12281012/?ito=newsnow-feed"
            meta="11:10:20"
          />
        </Ticker>
      )}
    </div>
  );
}

export default observer(ToDo);
