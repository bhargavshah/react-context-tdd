import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { UserContext, UserProvider } from "./UserContext";
import "@testing-library/jest-dom/extend-expect";

function TestComponent() {
  const { user, switchUser } = useContext(UserContext);
  return (
    <>
      <p>User: {user.name}</p>
      <button onClick={switchUser}>Switch user</button>
    </>
  );
}

describe("UserContext", () => {
  it("should provide user name", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
  });

  it("should be able to switch user", () => {
    const { getByRole } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    const switchUserButton = getByRole("button", { name: /^Switch user/i });
    switchUserButton.click();
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Bernie");
    switchUserButton.click();
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
  });
});
