import { describe, expect, it } from "bun:test";
import { decodeXoredArray as decode } from ".";

describe("1720. Decode XORed Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(decode([1, 2, 3], 1)).toEqual([1, 0, 2, 1]);
		expect(decode([6, 2, 7, 3], 4)).toEqual([4, 2, 0, 7, 4]);
	});
});
