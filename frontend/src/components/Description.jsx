import { useEffect } from "react";
import { useData } from "../context/Context";
import rental from "./../../public/rental.json";
import { useParams } from "react-router-dom";

function Description() {
  const { fetchDescription, description } = useData();
  const { id } = useParams();
  useEffect(() => {
    fetchDescription(id);
  }, [id]);
  console.log(description);
  return (
    <div className="mt-44 ">
      {description && (
        <div className="px-6 sm:text-3xl pl-4 pr-6">
          <h1 className=" font-semibold p-3 ml-3 italic">
            {description?.title}
          </h1>

          <div className="flex w-1/3 gap-7  ml-3 pr-6 mt-5">
            {description?.images?.map((img, i) => (
              <img src={img} alt="House image" className="object-cover" />
            ))}
          </div>
          <div className="grid grid-cols-2 grid-rows-1 font-semibold pl-4 gap-5">
            <h1 className=" mt-6  italic ">
              Overview: {description?.description}
            </h1>
            <h2 className="mt-6">Owner Name: {description?.ownerName}</h2>
            <h2>
              Address: {description?.address}, {description?.city}
            </h2>
            <h2>Bedrooms Available: {description?.bedrooms}</h2>
            <h2>Rating: {description?.rating}⭐ / 5</h2>
            <h2 className="mt-4">
              <span className="bg-yellow-400 px-4 font-bold py-2 rounded-sm">
                Price: Rs {description?.price}
              </span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Description;
