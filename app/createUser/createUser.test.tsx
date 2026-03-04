import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateUser from "./page";

describe("Create user component", () => {
  it("renders create user form", () => {
    render(<CreateUser />);
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  it("shows validation errors when fields are empty", async () => {
    render(<CreateUser />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(
      await screen.findByText(/First name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Last name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
  it("submits the form when inputs are valid", async () => {
    render(<CreateUser />);
    const firstNameInput = screen.getByPlaceholderText("First name");
    const lastNameInput = screen.getByPlaceholderText("Last name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(firstNameInput, { target: { value: "sumit" } });
    fireEvent.change(lastNameInput, { target: { value: "bhalekar" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(firstNameInput).toHaveValue("sumit");
    expect(lastNameInput).toHaveValue("bhalekar");
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
