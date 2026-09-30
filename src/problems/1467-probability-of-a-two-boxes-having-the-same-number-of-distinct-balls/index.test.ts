import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { probabilityOfATwoBoxesHavingTheSameNumberOfDistinctBalls as getProbability } from ".";

/** Lists every distinct shuffle, as in the statement's second example, and checks each. */
const byBruteForce = (balls: number[]): number => {
	const shuffles: number[][] = [];
	const left = [...balls];
	const build = (prefix: number[]): void => {
		if (left.every((count) => count === 0)) {
			shuffles.push(prefix);
			return;
		}
		left.forEach((count, colour) => {
			if (count === 0) return;
			left[colour] = count - 1;
			build([...prefix, colour]);
			left[colour] = count;
		});
	};
	build([]);
	const half = balls.reduce((sum, count) => sum + count, 0) / 2;
	const good = shuffles.filter(
		(s) => new Set(s.slice(0, half)).size === new Set(s.slice(half)).size,
	);
	return good.length / shuffles.length;
};

describe("1467. Probability of a Two Boxes Having The Same Number of Distinct Balls", () => {
	it("solves the examples from the problem statement", () => {
		expect(getProbability([1, 1])).toBeCloseTo(1, 9);
		expect(getProbability([2, 1, 1])).toBeCloseTo(8 / 12, 9);
		expect(getProbability([1, 2, 1, 2])).toBeCloseTo(0.6, 9);
	});

	it("handles the largest inputs", () => {
		const p = getProbability([6, 6, 6, 6, 6, 6, 6, 6]);
		expect(p).toBeGreaterThan(0);
		expect(p).toBeLessThanOrEqual(1);
	});

	it("matches listing every shuffle on random small inputs", () => {
		const random = createRandom(1467);
		for (let run = 0; run < 60; run++) {
			const balls = random.array(random.int(1, 4), 1, 3);
			const total = balls.reduce((s, x) => s + x, 0);
			if (total % 2 === 1 || total > 8) continue;
			expect(getProbability(balls)).toBeCloseTo(byBruteForce(balls), 9);
		}
	});
});
