function SearchFilter({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/*Search*/}
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/*Priority*/}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/*Status*/}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
export default SearchFilter;