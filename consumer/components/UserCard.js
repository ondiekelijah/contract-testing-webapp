
import Link from "next/link";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg border shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <Link
          href={`/users/${user.id}`}
          className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-400 transition duration-300"
        >
          {user.name}
        </Link>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Email: {user.email}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Age: {user.age}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Gender: {user.gender}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Phone: {user.phone}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Company: {user.company}
        </p>

      </div>
    </div>
  );
};

export default UserCard;
