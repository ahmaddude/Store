import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { user, updatedProfile, becomeASeller } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updatedProfile({ profilePic: base64Image });
    };
  };

  return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-40 h-40">
            <img
              src={selectedImg || user.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        {/* User Info Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
            <div className="grid grid-cols-2 gap-6 text-gray-300">
              <div className="space-y-1">
                <span className="text-gray-400">Member Since</span>
                <p className="text-white font-semibold">{user.createdAt?.split("T")[0]}</p>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400">Account Status</span>
                <p className="text-blue-400 font-semibold">{user.role}</p>
              </div>
            </div>

            {user?.role !== "seller" && (
              <div className="mt-6">
                <button
                  onClick={becomeASeller}
                  className="bg-blue-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                  Become a Seller
                </button>
              </div>
            )}
          </div>

          {/* Additional Info or Settings */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
            <h3 className="text-xl font-semibold text-white">User Bio</h3>
            <p className="text-gray-300">{user.bio}</p>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
