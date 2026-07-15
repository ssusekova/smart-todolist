import { useState, useEffect, useMemo } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "./App.css";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("active");
  const [filterText, setFilterText] = useState("Завершенные");

  const API_URL = "http://localhost:4000/api/tasks";
  const API_KEY = "my-secret-key";

  useEffect(() => {
    fetch(API_URL, { headers: { "x-api-key": API_KEY } })
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => console.log("Ошибка:", err));
  }, []);

  const handleAddTask = async () => {
    if (!inputValue.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ text: inputValue }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setInputValue("");
    } catch (e) {
      console.log("Ошибка при добавлении", e);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": API_KEY },
      });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.log("Ошибка при удалении", e);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
      );
      setInputValue("");
    } catch (e) {
      console.log("Ошибка при обновлении", e);
    }
  };

  const visibleTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => !task.isDone);
    }
    return tasks.filter((task) => task.isDone);
  }, [tasks, filter]);

  const handleChangeFilter = () => {
    setFilter((prev) => (prev === "active" ? "completed" : "active"));
    setFilterText((prev) => (prev === "Активные" ? "Завершенные" : "Активные"));
  };

  return (
    <div className="App">
      <h1>Мой список дел</h1>

      <TaskInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAddTask={handleAddTask}
        onClickFilter={handleChangeFilter}
        filterText={filterText}
      />

      <TaskList
        tasks={visibleTasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
      <p>Задач: {visibleTasks.length}</p>
    </div>
  );
};
