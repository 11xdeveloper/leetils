import { describe, expect, it } from "bun:test";
import { longestPathWithDifferentAdjacentCharacters as longestPath } from ".";

describe("2246. Longest Path With Different Adjacent Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestPath([-1, 0, 0, 1, 1, 2], "abacbe")).toBe(3);
		expect(longestPath([-1, 0, 0, 0], "aabc")).toBe(3);
	});

	it("handles a single node and a uniform tree", () => {
		expect(longestPath([-1], "z")).toBe(1);
		expect(longestPath([-1, 0, 1], "aaa")).toBe(1);
	});
});
