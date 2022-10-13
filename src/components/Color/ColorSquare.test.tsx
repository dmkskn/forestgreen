import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import ColorSquare from "./ColorSquare";

test("renders ColorSquare component as a button", () => {
	const color = { name: "white", value: "#ffffff" }
	render(
		<Provider store={store}>
			<ColorSquare color={color} showsLabel={false} isCopyable={false} />
		</Provider>
	);

	expect(screen.getByRole("button")).toBeInTheDocument();
});