import { describe, expect, it } from "bun:test";
import { minMaxGame } from ".";

describe("2293. Min Max Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMaxGame([1, 3, 5, 2, 4, 8, 2, 2])).toBe(1);
		expect(minMaxGame([3])).toBe(3);
	});
});
