import { describe, expect, it } from "bun:test";
import { findAllGoodIndices as goodIndices } from ".";

describe("2420. Find All Good Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodIndices([2, 1, 1, 1, 3, 4, 1], 2)).toEqual([2, 3]);
		expect(goodIndices([2, 1, 1, 2], 2)).toEqual([]);
	});
});
