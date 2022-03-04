import { useAuth } from "../context/authContext";

export function Home() {
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) return <h1>loading</h1>;
  return (
    <>
      <h1>User: {user?.displayName ? user?.displayName : user?.email}</h1>

      <button onClick={handleLogout}>logout</button>
    </>
  );
}
