import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { UserContext, SwitchUserContext, UserProvider } from "./UserContext";
import "@testing-library/jest-dom/extend-expect";

function TestComponent() {
  const { user } = useContext(UserContext);
  const { switchUser } = useContext(SwitchUserContext);
  return (
    <>
      <p>User: {user.name}</p>
      <button onClick={switchUser}>Switch user</button>
    </>
  );
}

describe("UserContext", () => {
  test("should provide user name", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
  });

  test("should be able to switch user", () => {
    const { getByRole } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
    const switchUserButton = getByRole("button", { name: /^Switch user/i });
    switchUserButton.click();
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Bernie");
    switchUserButton.click();
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
  });
});
