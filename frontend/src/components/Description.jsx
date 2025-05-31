import { useEffect } from "react";
import { useData } from "../context/Context";

import { useParams } from "react-router-dom";
import Loader from "./Loader";

function Description() {
  const { fetchDescription, description, isLoading, fetchAddToCart } =
    useData();
  const { id } = useParams();
  useEffect(() => {
    fetchDescription(id);
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToWishList = async () => {
    fetchAddToCart(id);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-44 ">
          {description && (
            <div className="px-6 sm:text-3xl pl-4 pr-6">
              <h1 className=" font-semibold p-3 ml-3 italic">
                {description?.title}
              </h1>

              <div className="flex w-1/3 gap-7  ml-3 pr-6 mt-5">
                {description?.images?.map((img, i) => (
                  <img
                    src={img}
                    key={i}
                    alt="House image"
                    className="object-cover"
                  />
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
          <button
            className="text-2xl sm:text-3xl mt-4 p-3 ml-10 bg-purple-600 text-amber-50 px-4 rounded-sm cursor-pointer hover:bg-purple-500 hover:font-semibold"
            onClick={handleAddToWishList}
          >
            Add to Wishlist
          </button>
        </div>
      )}
    </>
  );
}

export default Description;
