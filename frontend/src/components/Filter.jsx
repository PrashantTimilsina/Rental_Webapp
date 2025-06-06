import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { useData } from "../context/Context";
import Loader from "./Loader";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Filter() {
  const [text, setText] = useState("available");
  const [filterData, setFilterData] = useState([]);
  const { isLoading, setIsLoading } = useData();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let url = `${baseUrl}/rental?`;

        if (text === "available") {
          url += "available=true"; // filter by available rentals only
        } else {
          url += `sort=${text}`; // sort by price or -price
        }

        const res = await axios.get(url);
        setFilterData(res.data.rentals); // only the rentals array
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [text]);

  return (
    <div className="mt-40 text-2xl ">
      <div className="flex justify-center items-center gap-5">
        <p className=" text-3xl font-semibold text-center">Filter Houses</p>
        <select onChange={(e) => setText(e.target.value)} value={text}>
          <option value="available">Available</option>
          <option value="-price">Expensive</option>
          <option value="price">Cheaper</option>
        </select>
      </div>

      {/* Example rendering the filtered data */}
      <div className="mt-10">
        {isLoading ? <Loader /> : <Cards data={filterData} />}
      </div>
    </div>
  );
}

export default Filter;
