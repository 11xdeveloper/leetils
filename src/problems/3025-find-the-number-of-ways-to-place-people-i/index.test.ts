import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheNumberOfWaysToPlacePeopleI as numberOfPairs } from ".";

/** Checks every pair against every other point. */
const byBruteForce = (points: number[][]): number => {
	let pairs = 0;
	for (const [ax = 0, ay = 0] of points)
		for (const [bx = 0, by = 0] of points) {
			if ((ax === bx && ay === by) || ax > bx || ay < by) continue;
			if (
				points.every(
					([x = 0, y = 0]) =>
						(x === ax && y === ay) ||
						(x === bx && y === by) ||
						x < ax ||
						x > bx ||
						y > ay ||
						y < by,
				)
			)
				pairs++;
		}
	return pairs;
};

describe("3025. Find the Number of Ways to Place People I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfPairs([
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		).toBe(0);
		expect(
			numberOfPairs([
				[6, 2],
				[4, 4],
				[2, 6],
			]),
		).toBe(2);
		expect(
			numberOfPairs([
				[3, 1],
				[1, 3],
				[1, 1],
			]),
		).toBe(2);
	});

	it("matches checking every pair on random points", () => {
		const random = createRandom(3025);
		for (let run = 0; run < 300; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(2, 10); i > 0; i--) {
				const point = [random.int(0, 5), random.int(0, 5)];
				unique.set(point.join(), point);
			}
			const points = [...unique.values()];
			expect(numberOfPairs(points)).toBe(byBruteForce(points));
		}
	});
});
