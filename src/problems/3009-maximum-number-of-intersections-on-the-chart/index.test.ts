import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfIntersectionsOnTheChart } from ".";

/** Counts crossings at every integer and half-integer height. */
const byBruteForce = (y: number[]): number => {
	let best = 0;
	for (let h = 0; h <= 20; h += 0.5) {
		let count = 0;
		for (let i = 0; i + 1 < y.length; i++) {
			const [a = 0, b = 0] = [y[i], y[i + 1]];
			if (Math.min(a, b) <= h && h <= Math.max(a, b)) count++;
		}
		for (let i = 1; i + 1 < y.length; i++) if (y[i] === h) count--;
		best = Math.max(best, count);
	}
	return best;
};

describe("3009. Maximum Number of Intersections on the Chart", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumNumberOfIntersectionsOnTheChart([1, 2, 1, 2, 1, 3, 2])).toBe(
			5,
		);
		expect(maximumNumberOfIntersectionsOnTheChart([2, 1, 3, 4, 5])).toBe(2);
	});

	it("matches checking every height on random charts", () => {
		const random = createRandom(3009);
		for (let run = 0; run < 300; run++) {
			const y = [random.int(1, 8)];
			for (let i = random.int(1, 9); i > 0; i--) {
				let next = random.int(1, 8);
				while (next === y.at(-1)) next = random.int(1, 8);
				y.push(next);
			}
			expect(maximumNumberOfIntersectionsOnTheChart(y)).toBe(byBruteForce(y));
		}
	});
});
