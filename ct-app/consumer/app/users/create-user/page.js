import React from "react";
import CreateUserForm from "@/components/forms/Add";

const CreateUserPage = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide py-6 text-center">
        Create User
      </h1>
      <CreateUserForm />
    </>
  );
};

export default CreateUserPage;
