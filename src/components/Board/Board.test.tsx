import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Board from "./Board";


test("renders Board as the main content of the app", () => {
	render(
		<Provider store={store}>
			<Board />
		</Provider>
	);

	expect(screen.getByRole("main")).toBeInTheDocument();
});