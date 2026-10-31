import { describe, expect, it } from "bun:test";
import { findTheShortestSuperstringII as shortestSuperstring } from ".";

describe("3571. Find the Shortest Superstring II", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestSuperstring("aba", "bab")).toBe("abab");
		expect(shortestSuperstring("aa", "aaa")).toBe("aaa");
	});

	it("overlaps in the better order", () => {
		expect(shortestSuperstring("cab", "abc")).toBe("cabc");
		expect(shortestSuperstring("xy", "zw")).toHaveLength(4);
	});
});
