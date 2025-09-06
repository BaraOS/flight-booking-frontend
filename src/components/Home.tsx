import FlightSearchBar from "./flightSearchBar/FlightSearchBar";

const Home = () => {
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-primary via-gray-400 to-gray-200">
        <div className="flex min-h-[500px] w-full flex-col items-center justify-evenly gap-10 px-3 pb-2">
          <h1 className="mt-[4rem] text-wrap font-sans text-3xl font-thin text-white sm:mt-0 sm:text-5xl">
            Where would you like to go?
          </h1>
          <FlightSearchBar />
        </div>
      </div>
      <div className="min-h-[500px] bg-gray-100"></div>
    </div>
  );
};

export default Home;
