import { handleDeleteUser } from "@/app/actions";
import Link from "next/link";
import React from "react";

const renderUserDetail = (label, value) => (
  <p className="text-lg">
    <strong>{label}:</strong> {value}
  </p>
);

const UserProfileCard = ({ user }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 text-black">
        <h2 className="text-3xl font-bold 	 mb-6">{user.entity.name}</h2>
        <div className="space-y-4">
          {renderUserDetail("Email", user?.entity.email)}
          {renderUserDetail("Age", user?.entity.age)}
          {renderUserDetail("Gender", user?.entity.gender)}
          {renderUserDetail("Phone", user?.entity.phone)}
          {renderUserDetail("Company", user?.entity.company)}
          {renderUserDetail(
            "Address",
            `${user?.entity.address.street}, ${user?.entity.address.city}, ${user?.entity.address.state}, ${user?.entity.address.zip}, ${user?.entity.address.country}`
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Link href={`/users/edit/${user?.entity.id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Edit
            </button>
          </Link>
          <form action={handleDeleteUser}>
            <input type="hidden" name="id" value={user?.entity.id} />
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
