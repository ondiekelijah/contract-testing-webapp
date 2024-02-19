"use client";

import { handleCreateNewUser } from "@/app/actions";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

const initalState = {
  message: null,
  status: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const CreateUserForm = () => {
  const [state, formAction] = useFormState(handleCreateNewUser, initalState);

  state.status === "success" && redirect(`/users/${state?.user.id}`);

  return (
    <div className="flex justify-center items-center">
      <form action={formAction} className="max-w-4xl w-full">
        <div className="container mx-auto p-6 bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
          {/* Name Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          {/* Age Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="age"
              placeholder="Age"
            />
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone"
              placeholder="Phone"
            />
          </div>

          {/* Company Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="company"
              placeholder="Company"
            />
          </div>

          {/* Address Field */}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="street"
            >
              Street
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address"
              placeholder="Enter street, city, state, zip, country separated by commas (e.g., 123 Main St, New York, NY, 10001, USA)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <SubmitButton />
            {state.status === "success" && (
              <div className="text-green-500 font-bold">{state.message}</div>
            )}
            {state.status === "error" && (
              <div className="text-red-500 font-bold">{state.message}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
