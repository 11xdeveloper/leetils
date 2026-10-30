import { describe, expect, it } from "bun:test";
import { minimumScoreByChangingTwoElements as minimizeSum } from ".";

describe("2567. Minimum Score by Changing Two Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeSum([1, 4, 3])).toBe(0);
		expect(minimizeSum([1, 4, 7, 8, 5])).toBe(3);
	});
});
