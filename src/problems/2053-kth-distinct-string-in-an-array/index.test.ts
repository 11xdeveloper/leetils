import { describe, expect, it } from "bun:test";
import { kthDistinctStringInAnArray as kthDistinct } from ".";

describe("2053. Kth Distinct String in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthDistinct(["d", "b", "c", "b", "c", "a"], 2)).toBe("a");
		expect(kthDistinct(["aaa", "aa", "a"], 1)).toBe("aaa");
		expect(kthDistinct(["a", "b", "a"], 3)).toBe("");
	});
});
