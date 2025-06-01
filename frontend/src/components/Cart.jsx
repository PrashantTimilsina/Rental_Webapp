import { useEffect } from "react";
import { useData } from "../context/Context";
import Loader from "./Loader";
import axios from "axios";
import SuccessMsg from "../utils/SuccessMsg";
import ErrorMsg from "../utils/ErrorMsg";
import { useNavigate } from "react-router";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Cart() {
  const { cart, getCart, isLoading } = useData();
  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, []);
  async function deleteCart(id) {
    console.log(id);
    try {
      const res = await axios.delete(`${baseUrl}/wishlist/delete/${id}`, {
        withCredentials: true,
      });
      SuccessMsg("Item removed from wishlist");
      getCart();
    } catch (error) {
      ErrorMsg(error?.response?.data?.message);
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <h1 className="mt-36 text-3xl font-semibold p-2 ml-4 italic">
            Wishlist
          </h1>
          {cart.length === 0 && (
            <p className="text-3xl p-4 font-semibold ml-4">
              No houses in WishList
            </p>
          )}
          <div className="mt-6 grid lg:grid-cols-5 gap-6 md:grid-cols-4 grid-cols-2 p-3">
            {cart?.map((data, i) => (
              <div
                key={i}
                className="p-2 flex flex-col justify-center items-center gap-3.5  sm:text-2xl rounded-sm bg-amber-100 cursor-pointer"
                onClick={() => navigate(`/description/${data?.rental?._id}`)}
              >
                <img src={data?.rental?.imageURL} className="" />
                <h1>{data?.rental?.title}</h1>
                <h1>Address: {data?.rental?.address}</h1>
                <h1>Rating: {data?.rental?.rating}⭐ / 5</h1>
                <div className="flex gap-3 lg:flex-row flex-col">
                  <h1 className="bg-orange-400 px-4 py-2 rounded-sm">
                    Price: RS {data?.rental?.price}{" "}
                  </h1>
                  <button
                    className="bg-blue-600 text-white px-8 py-2 cursor-pointer"
                    onClick={() => deleteCart(data?.rental?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
