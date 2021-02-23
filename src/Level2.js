import { useUser } from "./UserContext";

export default function Level2() {
  const { user, switchUser } = useUser();

  return (
    <>
      Logged in as {user.name}
      <br />
      <br />
      <button onClick={switchUser}>Switch user</button>
    </>
  );
}
