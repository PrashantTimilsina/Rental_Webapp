import axios from "axios";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";

const baseUrl = import.meta.env.VITE_BASE_URL;
function Success() {
  const [search] = useSearchParams();

  const info = search.get("data");
  const decodedInfo = atob(info);
  const newInfo = JSON.parse(decodedInfo);
  const { id } = useParams();
  const resultStored = { ...newInfo, id };

  useEffect(() => {
    async function storePaymentDetails() {
      try {
        const res = await axios.post(`${baseUrl}/payment/${id}`, resultStored, {
          withCredentials: true,
        });
        const data = res.data;
      } catch (error) {
        console.log(error);
      }
    }
    storePaymentDetails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4 text-xl">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-xl w-full">
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500 animate-ping-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <div className="text-left text-gray-700 space-y-2">
          <p>
            <strong>Status:</strong> {newInfo?.status}
          </p>
          <p>
            <strong>Total Amount:</strong> ${newInfo?.total_amount}
          </p>
          <p>
            <strong>Transaction Code:</strong> {newInfo?.transaction_code}
          </p>
          <p>
            <strong>Transaction UUID:</strong> {newInfo?.transaction_uuid}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Success;
