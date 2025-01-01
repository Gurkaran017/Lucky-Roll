import React from "react";
import { useAuth } from "../Context/AuthProvider";
import Lists from "./Lists";

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { searchResults } = useAuth();
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-slate-200 rounded-lg p-6 w-3/4 md:w-2/4 shadow-lg max-h-[84vh] overflow-y-auto">
          <div className="flex justify-center mb-3">
            <h1 className="text-3xl font-bold">Players</h1>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            {searchResults.length === 0 ? (
              <h1 className="text-center text-gray-500">No player found</h1>
            ) : (
              searchResults.map((players) => (
                <Lists key={players._id} players={players} />
              ))
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
