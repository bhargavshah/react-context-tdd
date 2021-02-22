import { createContext } from "react";
import Level1 from "./Level1";
import { UserProvider } from "./UserContext";
import "./styles.css";

export const UserContext = createContext();

export default function App() {
  return (
    <UserProvider>
      <div className="App">
        <h1>Context Demo</h1>
        <Level1 />
      </div>
    </UserProvider>
  );
}
