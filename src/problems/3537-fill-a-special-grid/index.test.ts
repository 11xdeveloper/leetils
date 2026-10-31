import { describe, expect, it } from "bun:test";
import { fillASpecialGrid as specialGrid } from ".";

describe("3537. Fill a Special Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(specialGrid(0)).toEqual([[0]]);
		expect(specialGrid(1)).toEqual([
			[3, 0],
			[2, 1],
		]);
		expect(specialGrid(2)).toEqual([
			[15, 12, 3, 0],
			[14, 13, 2, 1],
			[11, 8, 7, 4],
			[10, 9, 6, 5],
		]);
	});
});
