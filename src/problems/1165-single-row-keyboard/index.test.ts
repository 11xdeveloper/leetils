import { describe, expect, it } from "bun:test";
import { singleRowKeyboard as calculateTime } from ".";

describe("1165. Single-Row Keyboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(calculateTime("abcdefghijklmnopqrstuvwxyz", "cba")).toBe(4);
		expect(calculateTime("pqrstuvwxyzabcdefghijklmno", "leetcode")).toBe(73);
	});

	it("costs nothing to repeat the first key", () => {
		expect(calculateTime("zyxwvutsrqponmlkjihgfedcba", "zzz")).toBe(0);
		expect(calculateTime("zyxwvutsrqponmlkjihgfedcba", "aza")).toBe(75);
	});
});
