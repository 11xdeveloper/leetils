import { describe, expect, it } from "bun:test";
import { countCaesarCipherPairs as countPairs } from ".";

describe("3805. Count Caesar Cipher Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs(["fusion", "layout"])).toBe(1);
		expect(countPairs(["ab", "aa", "za", "aa"])).toBe(2);
	});
});
