import appReducer, {
	AppState,
	updateColor,
	resetColor,
	updateNumberOfColumns,
	addToHistory,
	clearHistory,
	startCopyState,
	endCopyState
} from "./appSlice";

import data from "../data.json";
import ColorInterface from "../interfaces/Color";

describe("app reducer", () => {
	const initialState: AppState = {
		color: undefined,
		columns: 1,
		history: [],
		isCopying: false
	};

	const colors: Array<ColorInterface> = data;

	it("should update color", () => {
		const color = colors[0]
		const actual = appReducer(initialState, updateColor(color));
		expect(actual.color).toEqual(color);
	});

	it("should reset color", () => {
		const actual = appReducer(initialState, resetColor());
		expect(actual.color).toEqual(undefined);
	});

	it("should update number of columns", () => {
		const n = 2
		const actual = appReducer(initialState, updateNumberOfColumns(n));
		expect(actual.columns).toEqual(n);
	});

	it("should add to history new color", () => {
		const color = colors[0]
		const actual = appReducer(initialState, addToHistory(color));
		expect(actual.history).toEqual([color]);
	});

	it("should keep the size of the history no more than 5 colors", () => {
		const color = colors[6]
		const logged = colors.slice(0, 5)
		const result = [color, ...logged.slice(0, 4)]

		const stateWithFullHistory = { ...initialState, history: logged }
		const actual = appReducer(stateWithFullHistory, addToHistory(color));

		expect(actual.history).toEqual(result);
	});

	it("should not register the same color twice in the history, but simply push it to the beginning", () => {
		const logged = colors.slice(0, 5)
		const color = colors[3] // already logged
		const result = [color, ...logged.filter(loggedColor => loggedColor !== color)].slice(0, 5)

		const stateWithFullHistory = { ...initialState, history: logged }
		const actual = appReducer(stateWithFullHistory, addToHistory(color));

		expect(actual.history).toEqual(result);
	});

	it("should clear history", () => {
		const color = colors[0]
		const stateWithHistory = { ...initialState, history: [color] }
		const actual = appReducer(stateWithHistory, clearHistory());
		expect(actual.history).toEqual([]);
	});

	it("should set copy state", () => {
		const actual = appReducer(initialState, startCopyState());
		expect(actual.isCopying).toEqual(true);
	});

	it("should remove copy state", () => {
		const actual = appReducer(initialState, endCopyState());
		expect(actual.isCopying).toEqual(false);
	});
});