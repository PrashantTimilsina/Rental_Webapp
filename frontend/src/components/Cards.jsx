import rental from "./../../public/rental.json";
function Cards() {
  return (
    <>
      <div className="text-3xl mt-7 p-3">
        <div>
          <h1 className="font-semibold ml-5">Explore Rental Homes</h1>
          <hr className="mt-4" />
        </div>
        <div className="mt-12 space-y-10">
          {rental.map((data, i) => (
            <div
              key={i}
              className="grid grid-cols-2 grid-rows-1  border-black p-4 border-2 space-x-7"
            >
              <div>
                <img
                  src={data.imageURL}
                  alt="House image"
                  className="h-96 object-cover md:w-[550px] w-auto"
                />
              </div>
              <div className="flex flex-col gap-7">
                <h1 className="font-semibold text-4xl">{data?.title}</h1>
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
