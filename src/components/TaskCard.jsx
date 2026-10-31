function TaskCard({ task, deleteTask, moveTask, startEdit }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-slate-800">
          {task.title}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full shrink-0
            ${
              task.priority === "High"
                ? "bg-red-100 text-red-600"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
            }`}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-slate-500 mt-2 leading-5">
          {task.description}
        </p>
      )}
      {task.dueDate && (
        <div className="text-xs text-slate-400 mt-3">
          Due: {task.dueDate}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-4">
        {task.status !== "todo" && (
          <button
            onClick={() => moveTask(task.id, "todo")}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md"
          >
            Todo
          </button>
        )}
        {task.status !== "in-progress" && (
          <button
            onClick={() => moveTask(task.id, "in-progress")}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md"
          >
            In Progress
          </button>
        )}
        {task.status !== "completed" && (
          <button
            onClick={() => moveTask(task.id, "completed")}
            className="text-xs bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1.5 rounded-md"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => startEdit(task)}
          className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-600 px-3 py-1.5 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default TaskCard;