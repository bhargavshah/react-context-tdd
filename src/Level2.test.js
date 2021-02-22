import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserContext, UserProvider } from "./UserContext";
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
      user: name
    }
  };
};

describe("Level 2", () => {
  it("renders correct logged in user", () => {
    const providerProps = {
      value: {
        user: {
          name: "dummy"
        }
      }
    };
    renderWithUserProvider(<Level2 />, { providerProps });
    expect(screen.getByText(/^Logged in as/i)).toHaveTextContent(
      "Logged in as dummy"
    );
  });

  it("switches user when button is clicked", () => {
    const providerProps = {
      value: {
        user: {
          name: "A"
        }
      }
    };
    const { getByRole } = renderWithUserProvider(<Level2 />, { providerProps });
    expect(screen.getByText(/^Logged in as/i)).toHaveTextContent(
      "Logged in as A"
    );
    getByRole("button", { name: /Switch user/i }).click();
    expect(screen.getByText(/^logged in as/i)).toHaveTextContent(
      "Logged in as B"
    );
  });
});
