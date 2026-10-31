import { describe, expect, it } from "bun:test";
import { replaceNonCoprimeNumbersInArray as replaceNonCoprimes } from ".";

describe("2197. Replace Non-Coprime Numbers in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(replaceNonCoprimes([6, 4, 3, 2, 7, 6, 2])).toEqual([12, 7, 6]);
		expect(replaceNonCoprimes([2, 2, 1, 1, 3, 3, 3])).toEqual([2, 1, 1, 3]);
	});

	it("merges back into earlier numbers", () => {
		expect(replaceNonCoprimes([5, 7, 35])).toEqual([35]);
	});
});
