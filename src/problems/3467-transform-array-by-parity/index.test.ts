import { describe, expect, it } from "bun:test";
import { transformArrayByParity as transformArray } from ".";

describe("3467. Transform Array by Parity", () => {
	it("solves the examples from the problem statement", () => {
		expect(transformArray([4, 3, 2, 1])).toEqual([0, 0, 1, 1]);
		expect(transformArray([1, 5, 1, 4, 2])).toEqual([0, 0, 1, 1, 1]);
	});
});
