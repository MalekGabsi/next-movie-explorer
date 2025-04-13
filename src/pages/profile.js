"use client";
import { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext"; // Import the UserContext

const UserProfilePage = () => {
  // Access the user information from UserContext
  const { user } = useContext(UserContext); 
    console.log(user);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata.full_name || '',
    bio: user?.bio || '',
    email: user?.email || '',
    profilePicture: user?.user_metadata?.avatar_url || "/defaultUser.jpeg"
  });

  useEffect(() => {
    // You can fetch data from your API or UserContext for user details if needed
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // Implement the logic to save the profile changes
    // For example, an API call to update the user profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Handle sign out logic
    toast.success("You have been logged out.");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="space-y-8" style={{ marginLeft: "20px" }}>
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold">User Profile</h1>
          <p className="text-muted-foreground opacity-70">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden">
              <img
                src={user?.user_metadata?.avatar_url}
                alt={profileData.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 p-2 rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faEdit} className="text-white text-xl" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold" >{profileData.name}</h2>
              <p className="text-sm text-gray-400">{profileData.email}</p>
            </div>

            {isEditing ? (
              <div className="space-y-4 w-full">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-300">Name</label>
                  <input
                  readOnly={true}
                    type="text"
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm text-gray-300">Bio</label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="4"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div>
                  <label className="block text-sm text-gray-300">Bio</label>
                  <p className="text-gray-400">{profileData.bio || "No bio provided"}</p>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
