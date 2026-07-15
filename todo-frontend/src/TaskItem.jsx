import { useState } from "react";

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() === "") {
      handleCancel();
      return;
    }
    onUpdate(task.id, { text: editText });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleChangeStatus = (e) => {
    console.log(e);
    onUpdate(task.id, { isDone: e });
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">
              Сохранить
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Отменить
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="task-main">
            <input
              type="checkbox"
              className="task-status"
              checked={task.isDone}
              onChange={(e) => handleChangeStatus(e.target.checked)}
            />
            <span className="task-text">{task.text}</span>
          </div>
          <div className="task-actions">
            <button onClick={handleEdit} className="edit-btn">
              Редактировать
            </button>
            <button onClick={() => onDelete(task.id)} className="delete-btn">
              Удалить
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
