import { describe, expect, it } from "bun:test";
import { sortArrayByParityII } from ".";

describe("922. Sort Array By Parity II", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortArrayByParityII([4, 2, 5, 7])).toEqual([4, 5, 2, 7]);
		expect(sortArrayByParityII([2, 3])).toEqual([2, 3]);
	});
});
