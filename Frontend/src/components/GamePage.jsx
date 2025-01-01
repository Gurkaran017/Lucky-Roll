import React, { useEffect, useState } from "react";
import TotalScore from "./TotalScore";
import NumberSelector from "./NumberSelector";
import RuleModal from "./RuleModal";
import HighScore from "./HighScore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";
import { useAuth } from "../Context/AuthProvider";

const GamePage = () => {
  const { Search, setSearch, searchResults, setSearchResults } = useAuth();
  const [DiceNum, setDiceNum] = useState(1);
  const [selectedNum, setSelectedNum] = useState(0);
  const [Score, setScore] = useState(0);
  const [highScore, sethighScore] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [SearchModalOpen, setSearchModal] = useState(false);
  const [Nonum, setNonum] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const SearchOpen = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/Players?search=${Search}`
      );
      if (res.data.players && res.data.players.length === 0) {
        console.log("No players found");
        setSearchResults([]);
        setSearchModal(true);
      } else {
        setSearchResults(res.data);
        setSearchModal(true);
      }
    } catch (error) {
      setSearchResults([]);
      setSearchModal(true);
      console.log("Error occurred:", error.message);
    }
  };

  const SearchClose = () => setSearchModal(false);

  const RollDice = () => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    setDiceNum(randomNum);
    if (selectedNum === 0) {
      setNonum(true);
      return;
    }
    if (randomNum === selectedNum) {
      setScore(Score + randomNum);
      setSelectedNum(0);
      setNonum(false);
    } else {
      setScore(Score - 2);
      setSelectedNum(0);
      setNonum(false);
    }
  };

  if (Score > highScore) {
    sethighScore(Score);
  }

  const reset = () => {
    setNonum(false);
    setScore(0);
  };

  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("User");
    navigate("/");
  };

  useEffect(() => {
    const str = async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      sethighScore(user?.highestScore || 0);
    };
    str();
  }, []);

  useEffect(() => {
    const updateHighScore = async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      const email = user?.email;

      if (email) {
        try {
          await axios.post("http://127.0.0.1:5000/api/changeScore", {
            email,
            highScore,
          });
        } catch (error) {
          console.error("Error updating high score:", error);
        }
      }
    };

    updateHighScore();
  }, [highScore]);

  const diceImage = `/images/dice/dice_${DiceNum}.png`;

  return (
    <>
      <div>
        <div className="flex justify-between items-center mt-2 m-5">
          <div className="flex justify-end md:w-7/12">
            <button
              onClick={logout}
              className="mr-3 bg-black hover:font-black hover:bg-red-500 text-white py-1 md:px-16 px-8 rounded-md hover:text-black border-black border-2 duration-300 hover:ease-in-out"
            >
              Logout
            </button>
          </div>
          <div className="flex items-center justify-end md:mx-5">
            <input
              className="px-4 py-1 bg-slate-100 rounded-2xl border-black border-2 pr-8 w-44 md:w-auto"
              placeholder="Search Players . . ."
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch
              onClick={SearchOpen}
              className="cursor-pointer absolute text-gray-500 mr-[14px]"
            />
          </div>
        </div>

        <div className="flex justify-between md:m-10 m-5">
          <div className="md:flex mr-5 md:mr-0">
            <div className="mx-3">
              <HighScore highScore={highScore} />
            </div>
            <div className="mx-3">
              <TotalScore score={Score} />
            </div>
          </div>
          <NumberSelector
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            Nonum={Nonum}
            setNonum={setNonum}
          />
        </div>

        <div className="flex justify-center">
          <div>
            <div>
              <img
                className="cursor-pointer ml-3 w-11/12"
                onClick={RollDice}
                src={diceImage}
                alt={`Dice showing ${DiceNum}`}
              />
            </div>
            <div className="flex justify-center">
              <div>
                <div className="flex justify-center my-3">
                  <h1 className="text-2xl font-semibold">Click on Dice to roll</h1>
                </div>
                <div className="flex justify-center my-1">
                  <button
                    onClick={reset}
                    className="py-1 px-16 rounded-md hover:bg-black hover:text-white duration-200 ease-in-out font-semibold border-black border-2 m-2"
                  >
                    Reset Score
                  </button>
                </div>
                <div className="flex justify-center my-1">
                  <button
                    onClick={openModal}
                    className="bg-black text-white py-1 px-16 rounded-md hover:bg-white hover:text-black border-black border-2 duration-300 hover:ease-in-out"
                  >
                    Show Rules
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RuleModal isOpen={isModalOpen} onClose={closeModal} />
        <SearchModal isOpen={SearchModalOpen} onClose={SearchClose} />
      </div>
    </>
  );
};

export default GamePage;
