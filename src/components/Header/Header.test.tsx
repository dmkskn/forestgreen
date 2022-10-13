import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Header from "./Header";

test("renders Header as the banner of the app", () => {
	render(
		<Provider store={store}>
			<Header />
		</Provider>
	);

	expect(screen.getByRole("banner")).toBeInTheDocument();
});