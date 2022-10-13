import ColumnsStorage from "./ColumnsStorage";

describe("columns storage", () => {
	it("should save new value to the local storage", () => {
		jest.spyOn(Storage.prototype, "setItem");
		Storage.prototype.setItem = jest.fn();

		ColumnsStorage.set(5)

		expect(localStorage.setItem).toHaveBeenCalledWith(ColumnsStorage.KEY, "5")
	});

	it("should get the value from the local storage", () => {
		jest.spyOn(Storage.prototype, "getItem");
		Storage.prototype.getItem = jest.fn();

		ColumnsStorage.get()

		expect(localStorage.getItem).toHaveBeenCalledWith(ColumnsStorage.KEY)
	});
});