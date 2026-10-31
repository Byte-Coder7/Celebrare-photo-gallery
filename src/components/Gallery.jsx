import { useState, useCallback, useMemo, useReducer, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import SearchBar from "./SearchBar";

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];

    default:
      return state;
  }
}

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}
function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

const [favorites, dispatch] = useReducer(
  favoritesReducer,
  [],
  getInitialFavorites
);

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

const handleSearch = useCallback((event) => {
  setSearch(event.target.value);
}, []);

const filteredPhotos = useMemo(() => {
  return photos.filter((photo) =>
    photo.author.toLowerCase().includes(search.toLowerCase().trim())
  );
}, [photos, search]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F0E8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#718675] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#777D70]">
            Loading photos...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F0E8] flex items-center justify-center">
        <p className="text-[#252923] font-semibold">
          Error: {error}
        </p>
      </div>
    );
  }

  // Display photos
  return (
    <div className="min-h-screen bg-[#F5F0E8] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#252923] mb-3 tracking-tight">
          Celebrare Photo Gallery
        </h1>
        <p className="text-[#777D70] mb-8 text-sm">
            Discover beautiful moments, A little collection of moments worth remembering.
        </p>
        <SearchBar 
        search={search} onSearchChange={handleSearch} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {filteredPhotos.length === 0 ? (
    <div className="col-span-full text-center py-20">
      <h2 className="text-2xl font-semibold text-[#252923]">
        No photos found
      </h2>

      <p className="mt-2 text-[#777D70]">
        No photographer matches "{search}". Try another name.
      </p>
    </div>
  ) : (filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={photo.download_url}
                alt={`Photo by ${photo.author}`}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              />

              <div className="p-4 flex items-center justify-between">
                <p className="font-medium text-[#252923] text-sm">
                {photo.author}
                </p>

                <button
                onClick={() =>
                 dispatch({
                  type: "TOGGLE_FAVORITE",
                id: photo.id
               })
            }
            className={`text-2xl ${
            favorites.includes(photo.id)
            ? "text-[#-DC2626]"
            : "text-[#A3A3A3] hover:text-[#DC2626]"
   }`}
        aria-label="Toggle Favorite"
  >
    {favorites.includes(photo.id) ? "♥" : "♡"}
  </button>
 </div>
</div>
          )))
          }
        </div>

      </div>
    </div>
  );
}

export default Gallery;