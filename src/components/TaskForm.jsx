import { useEffect, useState } from "react";
function TaskForm({ addTask, editTask, editingTask, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Please enter a task title");
      return;
    }
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate
      };
      editTask(updatedTask);
    } else {
      const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        status: "todo"
      };
      addTask(newTask);
    }
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    cancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2.5 transition"
            >
              {editingTask ? "Update Task" : "+ Add Task"}
            </button>
            {editingTask && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default TaskForm;