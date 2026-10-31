import { describe, expect, it } from "bun:test";
import { minimumNumberOfMovesToSeatEveryone as minMovesToSeat } from ".";

describe("2037. Minimum Number of Moves to Seat Everyone", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMovesToSeat([3, 1, 5], [2, 7, 4])).toBe(4);
		expect(minMovesToSeat([4, 1, 5, 9], [1, 3, 2, 6])).toBe(7);
		expect(minMovesToSeat([2, 2, 6, 6], [1, 3, 2, 6])).toBe(4);
	});
});
