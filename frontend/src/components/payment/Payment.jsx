import CryptoJS from "crypto-js";
import { useParams, useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

function Payment() {
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get("amount"));
  const { id } = useParams();

  const tax_amount = 10;
  const product_service_charge = 0;
  const product_delivery_charge = 0;

  const total_amount =
    amount + tax_amount + product_service_charge + product_delivery_charge;

  const transaction_uuid = uuidv4();

  const product_code = "EPAYTEST";

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const secretKey = "8gBm/:&EnhH.1/q";
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="mt-40 max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          eSewa Payment
        </h2>

        <input
          type="text"
          name="amount"
          value={amount}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="tax_amount"
          value={tax_amount}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="total_amount"
          value={total_amount}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="transaction_uuid"
          value={transaction_uuid}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          name="product_code"
          value={product_code}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="hidden"
          name="product_service_charge"
          value={product_service_charge}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="hidden"
          name="product_delivery_charge"
          value={product_delivery_charge}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="hidden"
          name="success_url"
          value={`https://rental-frontend-ndxp.onrender.com/success/${id}`}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="hidden"
          name="failure_url"
          value="https://rental-frontend-ndxp.onrender.com/failure"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="hidden"
          name="signature"
          value={hashInBase64}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          value="Submit"
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition cursor-pointer"
        />
      </form>
    </>
  );
}

export default Payment;
