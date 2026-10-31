import { describe, expect, it } from "bun:test";
import { minimumHealthToBeatGame as minimumHealth } from ".";

describe("2214. Minimum Health to Beat Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumHealth([2, 7, 4, 3], 4)).toBe(13);
		expect(minimumHealth([2, 5, 3, 4], 7)).toBe(10);
		expect(minimumHealth([3, 3, 3], 0)).toBe(10);
	});
});
