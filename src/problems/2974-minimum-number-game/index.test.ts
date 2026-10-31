import { describe, expect, it } from "bun:test";
import { minimumNumberGame as numberGame } from ".";

describe("2974. Minimum Number Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberGame([5, 4, 2, 3])).toEqual([3, 2, 5, 4]);
		expect(numberGame([2, 5])).toEqual([5, 2]);
	});
});
