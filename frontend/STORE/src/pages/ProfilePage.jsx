import  { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { Camera, Mail, User } from 'lucide-react'

const ProfilePage = () => {
  const {user,updatedProfile,becomeASeller}=useAuthStore()
const [selectedImg,setSelectedImg]=useState(null);

  const handleImageUpload=async(e)=>{
    const file=e.target.files[0];
    if(!file)return;

    const reader=new FileReader();

    reader.readAsDataURL(file);

    reader.onload=async()=>{
      const base64Image=reader.result;
      setSelectedImg(base64Image);
      await updatedProfile({profilePic:base64Image});
  }}

  return (  <div className="min-h-screen pt-20 ">
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-base-300 rounded-xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold ">Profile</h1>
          <p className="mt-2">Your profile information</p>
        </div>

        {/* avatar upload section */}

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={ selectedImg||user.profilePic||"/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "
            />
            <label
              htmlFor="avatar-upload"
              
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                
              />
            </label>
          </div>
          
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-md text-black-400 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-700" />
              Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.name}</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-md text-black-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium  mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{user.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-blue-700">{user.role}</span>
            </div>
            
          </div>
          <div className=" justify-center flex items-center mt-4">
              {user?.role !== "seller" && (
  <button
    onClick={becomeASeller}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-emerald-600 cursor-pointer"
  >
    Become a Seller
  </button>
)}
              </div>
        </div>
      </div>
    </div>
  </div>
);
  
}

export default ProfilePage
