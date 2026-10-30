import { describe, expect, it } from "bun:test";
import { countAnagrams } from ".";

describe("2514. Count Anagrams", () => {
	it("solves the examples from the problem statement", () => {
		expect(countAnagrams("too hot")).toBe(18);
		expect(countAnagrams("aa")).toBe(1);
	});

	it("reduces large counts modulo 1e9 + 7", () => {
		// 20! mod 1e9 + 7
		expect(countAnagrams("abcdefghijklmnopqrst")).toBe(146326063);
	});
});
