import UserProfileCard from "@/components/UserProfileCard";
import createUserService from "@/utils/userServiceUtil";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default async function UserDetail({ params }) {
  const userService = createUserService();
  const user = await userService.getUser(params.id);

  if (!user || user.status !== "success") {
    return (
      <div className="flex justify-center items-center">
        <div className="max-w-4xl w-full p-6 text-center">
          <p>
            User not found, or it has been deleted, or there was an error in
            fetching user details.
          </p>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Go back to home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide py-6 text-center">
        User Detail
      </h1>
      <Suspense fallback={<Loader />}>
        <UserProfileCard user={user} />
      </Suspense>
    </>
  );
}
