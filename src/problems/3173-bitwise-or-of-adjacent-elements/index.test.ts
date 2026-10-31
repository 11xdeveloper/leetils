import { describe, expect, it } from "bun:test";
import { bitwiseOrOfAdjacentElements as orArray } from ".";

describe("3173. Bitwise OR of Adjacent Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(orArray([1, 3, 7, 15])).toEqual([3, 7, 15]);
		expect(orArray([8, 4, 2])).toEqual([12, 6]);
		expect(orArray([5, 4, 9, 11])).toEqual([5, 13, 11]);
	});
});
