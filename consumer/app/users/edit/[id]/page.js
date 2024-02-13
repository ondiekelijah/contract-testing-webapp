import createUserService from "@/utils/userServiceUtil";
import EditUserForm from "@/components/forms/Edit";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const EditUserPage = async ({ params }) => {
  const userService = createUserService();
  const { id } = params;
  const data = await userService.getUser(id);

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide py-6 text-center">
        Edit User
      </h1>
      <Suspense fallback={<Loader />}>
        <EditUserForm data={data} />
      </Suspense>
    </>
  );
};

export default EditUserPage;
