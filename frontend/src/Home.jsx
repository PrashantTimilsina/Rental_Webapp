import { useEffect } from "react";
import Cards from "./components/Cards";
import Hero from "./components/Hero";
import Topic from "./components/Topic";
import { useData } from "./context/Context";
function Home() {
  const { fetchRentalData, rentalData } = useData();
  useEffect(() => {
    fetchRentalData();
  }, []);
  return (
    <>
      <div className="mt-24 ">
        <Hero />
        <Topic />

        <Cards data={rentalData} />
      </div>
    </>
  );
}

export default Home;
