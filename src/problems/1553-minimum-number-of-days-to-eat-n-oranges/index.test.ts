import { describe, expect, it } from "bun:test";
import { minimumNumberOfDaysToEatNOranges as minDays } from ".";

/** Breadth-first search over every move, for every count up to a limit. */
const fewestDays = (limit: number): number[] => {
	const days = new Array<number>(limit + 1).fill(Infinity);
	days[0] = 0;
	for (let n = 1; n <= limit; n++) {
		let best = (days[n - 1] ?? Infinity) + 1;
		if (n % 2 === 0) best = Math.min(best, (days[n / 2] ?? Infinity) + 1);
		if (n % 3 === 0) best = Math.min(best, (days[n / 3] ?? Infinity) + 1);
		days[n] = best;
	}
	return days;
};

describe("1553. Minimum Number of Days to Eat N Oranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDays(10)).toBe(4);
		expect(minDays(6)).toBe(3);
	});

	it("matches considering every move up to 20000", () => {
		const days = fewestDays(20000);
		for (let n = 1; n <= 20000; n++) expect(minDays(n)).toBe(days[n] ?? 0);
	});

	it("handles 2 · 10^9 quickly", () => {
		expect(minDays(2 * 10 ** 9)).toBeLessThan(50);
	});
});
