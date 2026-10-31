import { describe, expect, it } from "bun:test";
import { findTheStringWithLcp as findTheString } from ".";

describe("2573. Find the String with LCP", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findTheString([
				[4, 0, 2, 0],
				[0, 3, 0, 1],
				[2, 0, 2, 0],
				[0, 1, 0, 1],
			]),
		).toBe("abab");
		expect(
			findTheString([
				[4, 3, 2, 1],
				[3, 3, 2, 1],
				[2, 2, 2, 1],
				[1, 1, 1, 1],
			]),
		).toBe("aaaa");
		expect(
			findTheString([
				[4, 3, 2, 1],
				[3, 3, 2, 1],
				[2, 2, 2, 1],
				[1, 1, 1, 3],
			]),
		).toBe("");
	});
});
