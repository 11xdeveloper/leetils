import { describe, expect, it } from "bun:test";
import { divideArrayIntoEqualPairs as divideArray } from ".";

describe("2206. Divide Array Into Equal Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(divideArray([3, 2, 3, 2, 2, 2])).toBeTrue();
		expect(divideArray([1, 2, 3, 4])).toBeFalse();
	});
});
