import { createContext, useContext, useState } from "react";

const users = {
  Fred: "Fred",
  Bernie: "Bernie"
};

export const UserContext = createContext();
export const SwitchUserContext = createContext();

export function UserProvider({ value = { name: users.Fred }, children }) {
  const [user, setUser] = useState(value);

  const switchUser = () => {
    setUser({ name: user.name === users.Fred ? users.Bernie : users.Fred });
  };

  return (
    <SwitchUserContext.Provider value={{switchUser}}>
      <UserContext.Provider value={{ user }}>
        {children}
      </UserContext.Provider>
    </SwitchUserContext.Provider>
  );
}

export function useUser() {
  const { user } = useContext(UserContext) || {};
  const { switchUser } = useContext(SwitchUserContext) || {};
  if (!user || !switchUser) {
    throw new Error('Cannot use `useUser` outside of `UserProvider`');
  }
  return { user, switchUser };
}
