import { useContext } from "react";
import { SwitchUserContext, UserContext } from "./UserContext";

export default function Level2() {
  const { user } = useContext(UserContext);
  const { switchUser } = useContext(SwitchUserContext);

  return (
    <>
      Logged in as {user.name}
      <br />
      <br />
      <button onClick={switchUser}>Switch user</button>
    </>
  );
}
