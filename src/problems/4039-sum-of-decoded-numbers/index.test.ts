import { describe, expect, it } from "bun:test";
import { sumOfDecodedNumbers as sumDecoded } from ".";

describe("4039. Sum of Decoded Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumDecoded([231])).toBe(8);
		expect(sumDecoded([2522, 2101])).toBe(1649);
		expect(sumDecoded([2301])).toBe(73741817);
	});
});
