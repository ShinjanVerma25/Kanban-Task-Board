import TaskCard from "./TaskCard";
function KanbanColumn({
  title,
  tasks,
  deleteTask,
  moveTask,
  startEdit
}) {

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">
            {title}
          </h2>
          <span className="bg-slate-100 text-slate-600 text-sm font-medium px-2.5 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="p-4 min-h-[350px]">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center min-h-[250px]">
            <p className="text-sm text-slate-400">
              No tasks here
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              moveTask={moveTask}
              startEdit={startEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
export default KanbanColumn;