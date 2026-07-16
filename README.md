# Smart TodoList

Простое приложение для управления задачами.  
Проект состоит из двух частей:

- `todo-frontend` — фронтенд на React + Vite.
- `todo-backend` — бэкенд на Node.js + Express.

## Возможности

- Добавление задачи.
- Удаление задачи.
- Редактирование задачи.
- Переключение статуса задачи.
- Фильтрация задач по статусу.

---

## Структура проекта

```bash
SMART TODOLIST
├── todo-backend
│   ├── server.js
│   ├── package.json
│   └── .env
└── todo-frontend
    ├── src
    ├── public
    ├── package.json
    └── vite.config.js
```

---

## Требования

- Node.js 18+
- npm 9+

---

## Установка

### 1. Клонировать проект

```bash
git clone <URL_репозитория>
cd SMART-TODOLIST
```

### 2. Установить зависимости фронтенда

```bash
cd todo-frontend
npm install
```

### 3. Установить зависимости бэкенда

```bash
cd ../todo-backend
npm install
```

---

## Запуск проекта локально

### Запуск бэкенда

Открой отдельный терминал:

```bash
npm start
```

Бэкенд обычно запускается на `http://localhost:4000`.

### Запуск фронтенда

Во втором терминале:

```bash
cd todo-frontend
npm run dev
```

Фронтенд Vite обычно запускается на `http://localhost:5173`.

---

## Сборка фронтенда

```bash
cd todo-frontend
npm run build
```

После сборки будет создана папка `dist`.

---

## API документация

Базовый URL локально:

```bash
http://localhost:4000/api/tasks
```

### Заголовок авторизации

Для запросов используется заголовок:

```http
x-api-key: my-secret-key
```

Если ключ обязателен на бэкенде, его нужно передавать во всех запросах.

---

### Получить все задачи

**GET** `/api/tasks`

Возвращает список всех задач.

#### Пример ответа

```json
[
  {
    "id": 1,
    "text": "Купить молоко",
    "isDone": false
  }
]
```

---

### Добавить задачу

**POST** `/api/tasks`

Создаёт новую задачу.

#### Тело запроса

```json
{
  "text": "Проверить тесты"
}
```

#### Пример ответа

```json
{
  "id": 2,
  "text": "Проверить тесты",
  "isDone": false
}
```

---

### Удалить задачу

**DELETE** `/api/tasks/:id`

Удаляет задачу по ID.

#### Пример

```bash
DELETE /api/tasks/2
```

#### Пример ответа

```json
{
  "message": "Task deleted"
}
```

---

### Обновить задачу

**PATCH** `/api/tasks/:id`

Обновляет задачу частично, например текст или статус.

#### Тело запроса

```json
{
  "text": "Новый текст"
}
```

или

```json
{
  "isDone": true
}
```

#### Пример ответа

```json
{
  "id": 2,
  "text": "Новый текст",
  "isDone": true
}
```

---

## Запуск тестов

```bash
cd todo-frontend
npm test
```

---

## Технологии

- React
- Vite
- Node.js
- Express
- Jest
- React Testing Library

---

## Автор

Пендрак Софья Артемовна
