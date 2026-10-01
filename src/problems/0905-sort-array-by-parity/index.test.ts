import { describe, expect, it } from "bun:test";
import { sortArrayByParity } from ".";

describe("905. Sort Array By Parity", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortArrayByParity([3, 1, 2, 4])).toEqual([2, 4, 3, 1]);
		expect(sortArrayByParity([0])).toEqual([0]);
	});
});
