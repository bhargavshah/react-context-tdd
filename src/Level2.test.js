import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserProvider } from "./UserContext";
import Level2 from "./Level2";

const renderWithUserProvider = (ui, { providerProps, ...renderProps }) => {
  return render(
    <UserProvider {...providerProps}>{ui}</UserProvider>,
    renderProps
  );
};

const getProviderProps = (name) => {
  return {
    value: {
      name,
    }
  };
};

describe("Level 2", () => {
  test("renders correct logged in user", () => {
    renderWithUserProvider(<Level2 />, { providerProps: getProviderProps('dummy') });
    expect(screen.getByText(/^Logged in as/i)).toHaveTextContent(
      "Logged in as dummy"
    );
  });

  test("switches user when button is clicked", () => {
    const { getByRole } = renderWithUserProvider(<Level2 />, { providerProps: getProviderProps('Bernie') });
    expect(screen.getByText(/^Logged in as/i)).toHaveTextContent(
      "Logged in as Bernie"
    );
    getByRole("button", { name: /Switch user/i }).click();
    expect(screen.getByText(/^logged in as/i)).toHaveTextContent(
      "Logged in as Fred"
    );
  });
});
