import { render, screen } from "@testing-library/react";
import { UserProvider, useUser } from "./UserContext";
import "@testing-library/jest-dom/extend-expect";

function TestComponent() {
  const { user, switchUser } = useUser();
  return (
    <>
      <p>User: {user.name}</p>
      <button onClick={switchUser}>Switch user</button>
    </>
  );
}

describe("UserContext", () => {
  let component;
  beforeEach(() => {
    component = render(<TestComponent />, { wrapper: UserProvider });
  });

  test("should provide user name", () => {
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
  });

  test("should be able to switch user", () => {
    const { getByRole } = component;
    const switchUserButton = getByRole("button", { name: /^Switch user/i });
    switchUserButton.click();
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Bernie");
    switchUserButton.click();
    expect(screen.getByText(/^User:/i)).toHaveTextContent("User: Fred");
  });

  test('should throw error when not wrapped inside `UserProvider`', () => {
    const err = console.error;
    console.error = jest.fn();
    let actualErrorMsg;
    try {
      render(<TestComponent />);
    } catch(e) {
      actualErrorMsg = e.message;
    }
    const expectedErrorMsg = 'Cannot use `useUser` outside of `UserProvider`';
    expect(actualErrorMsg).toEqual(expectedErrorMsg);

    console.error = err;
  });
});
