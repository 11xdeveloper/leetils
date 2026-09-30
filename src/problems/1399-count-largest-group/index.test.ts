import { describe, expect, it } from "bun:test";
import { countLargestGroup } from ".";

/** Groups numbers by digit sums of their strings. */
const byBruteForce = (n: number): number => {
	const groups = new Map<number, number>();
	for (let x = 1; x <= n; x++) {
		const sum = [...String(x)].reduce((s, d) => s + Number(d), 0);
		groups.set(sum, (groups.get(sum) ?? 0) + 1);
	}
	const largest = Math.max(...groups.values());
	return [...groups.values()].filter((size) => size === largest).length;
};

describe("1399. Count Largest Group", () => {
	it("solves the examples from the problem statement", () => {
		expect(countLargestGroup(13)).toBe(4);
		expect(countLargestGroup(2)).toBe(2);
	});

	it("matches grouping by digit strings", () => {
		for (const n of [1, 9, 10, 24, 99, 100, 1000, 9999, 10000]) {
			expect(countLargestGroup(n)).toBe(byBruteForce(n));
		}
	});
});
