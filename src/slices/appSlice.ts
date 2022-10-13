import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ColumnsStorage from "../storage/ColumnsStorage";
import HistoryStorage from "../storage/HistoryStorage";
import ColorInterface from "../interfaces/Color"
import { RootState } from "../store";


export interface AppState {
	color?: ColorInterface;
	history: Array<ColorInterface>;
	columns: number;
	isCopying: boolean;
}


const initialState: AppState = {
	color: undefined,
	history: HistoryStorage.get(),
	columns: ColumnsStorage.get(),
	isCopying: false
};


export const appSlice = createSlice({
	name: "app",
	initialState: initialState,
	reducers: {
		updateColor(state, action: PayloadAction<ColorInterface>) {
			state.color = action.payload
		},

		resetColor(state) {
			state.color = undefined
		},

		updateNumberOfColumns(state, action: PayloadAction<number>) {
			state.columns = action.payload
			ColumnsStorage.set(state.columns)
		},

		addToHistory(state, action: PayloadAction<ColorInterface>) {
			const newColor = action.payload
			state.history = [newColor, ...state.history.filter(oldColor => oldColor.name !== newColor.name)].slice(0, 5)
			HistoryStorage.set(state.history)
		},

		clearHistory(state) {
			state.history = []
		},

		startCopyState(state) {
			state.isCopying = true
		},

		endCopyState(state) {
			state.isCopying = false
		}
	}
})


// Selectors

export const selectColumns = (state: RootState) => state.app.columns;
export const selectHistory = (state: RootState) => state.app.history;
export const selectIsCopying = (state: RootState) => state.app.isCopying;
export const selectColor = (state: RootState) => state.app.color;


// Actions

export const {
	updateColor,
	resetColor,
	updateNumberOfColumns,
	addToHistory,
	clearHistory,
	startCopyState,
	endCopyState
} = appSlice.actions;


// Export Reducer

export default appSlice.reducer;