import { useState } from "react";
import { useData } from "../context/Context";

function Profile() {
  const { profileData } = useData();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [changePassData, setChangePassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  if (!profileData) return <p className="text-center mt-40">Loading...</p>;

  return (
    <div className="flex justify-center px-4 mt-40 items-center ">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg ">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
            alt="profile"
            className="w-28 h-28 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">
            Name: {profileData?.user?.name}
          </h2>
          <p className="text-gray-600 mb-4 text-xl">
            Email: {profileData?.user?.email}
          </p>
          <p className="text-gray-600 mb-4 text-xl">Password: **********</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setShowChangePassword(true);
                setShowResetPassword(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Change Password
            </button>
            <button
              onClick={() => {
                setShowResetPassword(true);
                setShowChangePassword(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </div>

        {/* Change Password Section */}
        {showChangePassword && (
          <form className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded p-2"
              value={changePassData.currentPassword}
              onChange={(e) =>
                setChangePassData({
                  ...changePassData,
                  currentPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded p-2"
              value={changePassData.newPassword}
              onChange={(e) =>
                setChangePassData({
                  ...changePassData,
                  newPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded p-2"
              value={changePassData.confirmPassword}
              onChange={(e) =>
                setChangePassData({
                  ...changePassData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Submit Change
            </button>
          </form>
        )}

        {/* Reset Password Section */}
        {showResetPassword && (
          <form className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded p-2"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
