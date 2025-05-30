import { useEffect } from "react";
import Cards from "./components/Cards";
import Hero from "./components/Hero";
import Topic from "./components/Topic";
import { useData } from "./context/Context";
import Loader from "./components/Loader";
function Home() {
  const { fetchRentalData, rentalData, isLoading } = useData();
  useEffect(() => {
    fetchRentalData();
  }, []);
  return (
    <>
      <div className="mt-24 ">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Hero />
            <Topic />

            <Cards data={rentalData} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
