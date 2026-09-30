import { describe, expect, it } from "bun:test";
import { keysAndRooms as canVisitAllRooms } from ".";

describe("841. Keys and Rooms", () => {
	it("solves the examples from the problem statement", () => {
		expect(canVisitAllRooms([[1], [2], [3], []])).toBeTrue();
		expect(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]])).toBeFalse();
	});
});
