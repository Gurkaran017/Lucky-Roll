import React from "react";
import { Link } from "react-router-dom";
import dices from "../../public/images/dices.png";

const HomePage = () => {
  return (
    <>
      <div className="md:flex justify-center md:mt-20 mt-36 ">
        <div>
          <img className="ml-4 md:ml-0 w-10/12" src={dices} />
        </div>
        <div className="content-center">
          <div className="flex justify-center"><div><h1 className="md:text-7xl text-5xl font-bold">LUCKY ROLL</h1></div></div>
          <div className="flex md:justify-end mt-3 justify-center">
          <Link to="/gamepage">
          <button href="/gamepage" className=" bg-black text-white py-1 px-16 rounded-md hover:bg-white hover:text-black border-black border-2 duration-300 hover:ease-in-out">
              Play Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
