import { describe, expect, it } from "bun:test";
import { findAllLonelyNumbersInTheArray as findLonely } from ".";

describe("2150. Find All Lonely Numbers in the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLonely([10, 6, 5, 8])).toEqual([8, 10]);
		expect(findLonely([1, 3, 5, 3])).toEqual([1, 5]);
	});
});
