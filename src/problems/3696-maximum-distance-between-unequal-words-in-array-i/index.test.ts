import { describe, expect, it } from "bun:test";
import { maximumDistanceBetweenUnequalWordsInArrayI as maxDistance } from ".";

describe("3696. Maximum Distance Between Unequal Words in Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance(["leetcode", "leetcode", "codeforces"])).toBe(3);
		expect(maxDistance(["a", "b", "c", "a", "a"])).toBe(4);
		expect(maxDistance(["z", "z", "z"])).toBe(0);
	});
});
