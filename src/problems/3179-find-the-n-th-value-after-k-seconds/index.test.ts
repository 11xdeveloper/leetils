import { describe, expect, it } from "bun:test";
import { findTheNThValueAfterKSeconds as valueAfterKSeconds } from ".";

describe("3179. Find the N-th Value After K Seconds", () => {
	it("solves the examples from the problem statement", () => {
		expect(valueAfterKSeconds(4, 5)).toBe(56);
		expect(valueAfterKSeconds(5, 3)).toBe(35);
	});

	it("reduces large values modulo 10^9 + 7", () => {
		expect(valueAfterKSeconds(1000, 1000)).toBeLessThan(1_000_000_007);
		expect(valueAfterKSeconds(1, 1000)).toBe(1);
	});
});
