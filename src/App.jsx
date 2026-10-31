import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import SearchFilter from "./components/SearchFilter";
import KanbanColumn from "./components/KanbanColumn";
function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);
  //Add Task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  //Edit Task
  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTask(null);
  };
  //Start Editing
  const startEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  //Cancel Editing
  const cancelEdit = () => {
    setEditingTask(null);
  };
  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //Move Task
  const moveTask = (id, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: newStatus
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  // Search and Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPriority =
      priority === "All" || task.priority === priority;

    const matchesStatus =
      status === "All" || task.status === status;
    return matchesSearch && matchesPriority && matchesStatus;
  });
  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );
  const progressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );
  const isFiltering =
    search !== "" ||
    priority !== "All" ||
    status !== "All";

  return (
    <div className="min-h-screen bg-slate-100">
      {/*Header*/}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Kanban Task Board
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your tasks and stay organized
              </p>
            </div>
            <div className="hidden sm:block bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
              {tasks.length} Tasks
            </div>
          </div>
        </div>
      </header>
      {/*Main*/}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <TaskForm
          addTask={addTask}
          editTask={editTask}
          editingTask={editingTask}
          cancelEdit={cancelEdit}
        />

        <div className="mt-5">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            priority={priority}
            setPriority={setPriority}
            status={status}
            setStatus={setStatus}
          />
        </div>
        {/*No Results*/}
        {isFiltering && filteredTasks.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 mt-5 text-center">
            <h2 className="text-lg font-semibold text-slate-700">
              No matching tasks
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            <KanbanColumn
              title="Todo"
              tasks={todoTasks}
              deleteTask={deleteTask}
              moveTask={moveTask}
              startEdit={startEdit}
            />
            <KanbanColumn
              title="In Progress"
              tasks={progressTasks}
              deleteTask={deleteTask}
              moveTask={moveTask}
              startEdit={startEdit}
            />
            <KanbanColumn
              title="Completed"
              tasks={completedTasks}
              deleteTask={deleteTask}
              moveTask={moveTask}
              startEdit={startEdit}
            />
          </div>
        )}
      </main>
    </div>
  );
}
export default App;