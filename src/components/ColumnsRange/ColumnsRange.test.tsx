import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import ColumnsRange from "./ColumnsRange";

test("renders ColumnsRange as a slider", () => {
  render(
    <Provider store={store}>
      <ColumnsRange />
    </Provider>
  );

  expect(screen.getByRole("slider")).toBeInTheDocument();
});