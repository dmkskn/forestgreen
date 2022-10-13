import HistoryStorage from "./HistoryStorage";

describe("history storage", () => {

    it("should save new value to the local storage", () => {
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.setItem = jest.fn();

        HistoryStorage.set([])

        expect(localStorage.setItem).toHaveBeenCalledWith(HistoryStorage.KEY, "[]")
    });

    it("should get the value from the local storage", () => {
        jest.spyOn(Storage.prototype, "getItem");
        Storage.prototype.getItem = jest.fn();

        HistoryStorage.get()

        expect(localStorage.getItem).toHaveBeenCalledWith(HistoryStorage.KEY)
    });
});