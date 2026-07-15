export default function TaskInput({
  inputValue,
  setInputValue,
  onAddTask,
  onClickFilter,
  filterText,
}) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите задачу"
      />
      <button onClick={onAddTask}>Добавить</button>
      <button onClick={onClickFilter}>{filterText}</button>
    </div>
  );
}
