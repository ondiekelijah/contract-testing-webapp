import createUserService from "../utils/userServiceUtil";
import UserCard from "@/components/UserCard";

const Home = async () => {
  const userService = createUserService();
  const data = await userService.getAllUsers();

  return (
    <main className="mx-auto max-w-screen-xl flex min-h-screen flex-col px-4 lg:px-8 space-y-10">
      <div class="text-center sm:text-left">
        <h2 class="text-xl font-bold  sm:text-2xl text-gray-400">
          List of Users 📜👥
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.entities?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
};

export default Home;
