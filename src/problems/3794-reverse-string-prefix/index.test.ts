import { describe, expect, it } from "bun:test";
import { reverseStringPrefix as reversePrefix } from ".";

describe("3794. Reverse String Prefix", () => {
	it("solves the examples from the problem statement", () => {
		expect(reversePrefix("abcd", 2)).toBe("bacd");
		expect(reversePrefix("xyz", 3)).toBe("zyx");
		expect(reversePrefix("hey", 1)).toBe("hey");
	});
});
