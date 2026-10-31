import { describe, expect, it } from "bun:test";
import { findTheLeastFrequentDigit as getLeastFrequentDigit } from ".";

describe("3663. Find The Least Frequent Digit", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLeastFrequentDigit(1553322)).toBe(1);
		expect(getLeastFrequentDigit(723344511)).toBe(2);
	});
});
