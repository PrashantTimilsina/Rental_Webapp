import { useNavigate } from "react-router";
// import rental from "./../../public/rental.json";
function Cards({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-2xl  mt-3 p-3 cursor-pointer">
        <div className="mt-12 space-y-10 grid sm:grid-row-1 sm:grid-cols-1 grid-cols-2 gap-7">
          {data.map((data, i) => (
            <div
              key={i}
              className="grid sm:grid-cols-2 grid-rows-1  border-black p-4 border-2 space-x-7 sm:w-auto "
              onClick={() => navigate(`/description/${data?._id}`)}
            >
              <div>
                <img
                  src={data.imageURL}
                  alt="House image"
                  className="sm:h-96 object-cover md:w-[550px] sm:w-auto  w-full "
                />
              </div>
              <div className="flex flex-col gap-7">
                <h1 className="font-semibold  sm:mt-0 mt-4 text-3xl">
                  {data?.title}
                </h1>
                <h1>
                  <span className="font-semibold">Address:</span>{" "}
                  {data?.address}, {data?.city}
                </h1>
                <h1>
                  {" "}
                  <span className="font-semibold">Bedrooms: </span>
                  {data?.bedrooms}
                </h1>
                <h1>
                  {" "}
                  <span className="font-semibold">Rating: </span>
                  {data?.rating}⭐ / 5
                </h1>
                <h1>
                  {" "}
                  <span className="font-semibold">Available: </span>
                  {data?.available ? "Yes" : "No"}
                </h1>
                <h1 className="font-semibold  flex gap-4 items-center">
                  {" "}
                  <span className="font-semibold bg-amber-400 p-2 rounded-md text-white">
                    Price:
                  </span>
                  Rs {data?.price}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
