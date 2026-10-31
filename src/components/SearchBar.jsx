function SearchBar({ search, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search photos by author..."
      value={search}
      onChange={onSearchChange}
      className="w-full max-w-md px-5 py-3 mb-8 border border-[#DDD7CB] rounded-xl bg-white text-[#252923] placeholder:text-[#777D70] outline-none focus:ring-2 focus:ring-[#B68B52] focus:border-[#B68B52] transition-all"
    />
  );
}

export default SearchBar;