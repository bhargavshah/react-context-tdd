import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Level2() {
  const { user, switchUser } = useContext(UserContext);

  return (
    <>
      Logged in as {user.name}
      <br />
      <br />
      <button onClick={switchUser}>Switch user</button>
    </>
  );
}
