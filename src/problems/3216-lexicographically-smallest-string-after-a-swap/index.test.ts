import { describe, expect, it } from "bun:test";
import { lexicographicallySmallestStringAfterASwap as getSmallestString } from ".";

describe("3216. Lexicographically Smallest String After a Swap", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSmallestString("45320")).toBe("43520");
		expect(getSmallestString("001")).toBe("001");
	});
});
