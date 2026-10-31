import { describe, expect, it } from "bun:test";
import { oddStringDifference as oddString } from ".";

describe("2451. Odd String Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(oddString(["adc", "wzy", "abc"])).toBe("abc");
		expect(oddString(["aaa", "bob", "ccc", "ddd"])).toBe("bob");
	});
});
