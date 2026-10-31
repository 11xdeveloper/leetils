import { describe, expect, it } from "bun:test";
import { lexicographicallySmallestStringAfterOperationsWithConstraint as getSmallestString } from ".";

describe("3106. Lexicographically Smallest String After Operations With Constraint", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSmallestString("zbbz", 3)).toBe("aaaz");
		expect(getSmallestString("xaxcd", 4)).toBe("aawcd");
		expect(getSmallestString("lol", 0)).toBe("lol");
	});
});
