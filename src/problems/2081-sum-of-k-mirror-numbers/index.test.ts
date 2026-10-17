import { describe, expect, it } from "bun:test";
import { sumOfKMirrorNumbers as kMirror } from ".";

describe("2081. Sum of k-Mirror Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(kMirror(2, 5)).toBe(25);
		expect(kMirror(3, 7)).toBe(499);
		expect(kMirror(7, 17)).toBe(20379000);
	});

	it("handles the largest inputs", () => {
		expect(kMirror(2, 30)).toBe(2609044274);
		expect(kMirror(9, 30)).toBe(18627530);
	});
});
