require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY || "my-secret-key";

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

app.use("/api/tasks", checkApiKey);

let tasks = [];
let nextId = 1;

app.get("/api/tasks", async (req, res) => {
  try {
    res.json(tasks);
  } catch (e) {
    console.log("Ошибка при получении задач", e.message);
    res.status(500).json({ error: "Ошибка при запросе к API" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = {
      id: nextId++,
      text: req.body.text,
      isDone: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (e) {
    console.log("Ошибка при добавлении задачи", e.message);
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((t) => t.id !== id);
    res.sendStatus(204);
  } catch (e) {
    console.log("Ошибка при удалении задачи", e.message);
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Задача не найдена" });
    }
    tasks[taskIndex].text = req.body.text;
    res.json(tasks[taskIndex]);
  } catch (e) {
    console.log("Ошибка при обновлении задачи", e.message);
    res.status(500).json({ error: "Ошибка при обновлении" });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Задача не найдена" });
    }
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
    };

    res.json(tasks[taskIndex]);
  } catch (e) {
    console.log("Ошибка при обновлении задачи", e.message);
    res.status(500).json({ error: "Ошибка при обновлении" });
  }
});

module.exports = app;
