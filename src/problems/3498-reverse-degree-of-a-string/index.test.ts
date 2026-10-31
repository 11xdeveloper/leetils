import { describe, expect, it } from "bun:test";
import { reverseDegreeOfAString as reverseDegree } from ".";

describe("3498. Reverse Degree of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseDegree("abc")).toBe(148);
		expect(reverseDegree("zaza")).toBe(160);
	});
});
