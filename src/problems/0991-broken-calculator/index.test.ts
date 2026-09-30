import { describe, expect, it } from "bun:test";
import { brokenCalculator } from ".";

/** Breadth-first search over values, bounded above. */
const bySearch = (start: number, target: number): number => {
	const limit = 2 * Math.max(start, target) + 2;
	const seen = new Set([start]);
	let frontier = [start];
	for (let steps = 0; ; steps++) {
		const next: number[] = [];
		for (const value of frontier) {
			if (value === target) return steps;
			for (const moved of [value * 2, value - 1]) {
				if (moved < 1 || moved > limit || seen.has(moved)) continue;
				seen.add(moved);
				next.push(moved);
			}
		}
		frontier = next;
	}
};

describe("991. Broken Calculator", () => {
	it("solves the examples from the problem statement", () => {
		expect(brokenCalculator(2, 3)).toBe(2);
		expect(brokenCalculator(5, 8)).toBe(2);
		expect(brokenCalculator(3, 10)).toBe(3);
	});

	it("matches searching every sequence of operations for small values", () => {
		for (let start = 1; start <= 40; start++)
			for (let target = 1; target <= 40; target++)
				expect(brokenCalculator(start, target)).toBe(bySearch(start, target));
	});
});
