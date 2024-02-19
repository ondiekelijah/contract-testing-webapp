"use server";

import { revalidatePath } from "next/cache";
import createUserService from "@/utils/userServiceUtil";
import { redirect } from "next/navigation";

async function handleCreateNewUser(prevState, formData) {
  const userService = createUserService();

  const formDataObject = {};
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  revalidatePath("/");

  return await userService.createUser(formDataObject);
}

async function handleUpdateUser(prevState, formData) {
  const userService = createUserService();

  const formDataObject = {};
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }

  revalidatePath("/");

  return await userService.updateUser(formDataObject);
}

async function handleDeleteUser(formData) {
  const userService = createUserService();

  const { id } = Object.fromEntries(formData);

  revalidatePath("/");

  await userService.deleteUser(id).then((res) => {
    redirect("/");
  });
}

export { handleDeleteUser, handleUpdateUser, handleCreateNewUser };
