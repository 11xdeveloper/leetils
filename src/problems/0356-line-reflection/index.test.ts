import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lineReflection } from ".";

/** Tries every candidate line at half-integer steps across the points' range. */
const byBruteForce = (points: number[][]): boolean => {
	const set = new Set(points.map(([x, y]) => `${x},${y}`));
	const xs = points.map(([x = 0]) => x);
	for (
		let doubled = 2 * Math.min(...xs);
		doubled <= 2 * Math.max(...xs);
		doubled++
	) {
		if (points.every(([x = 0, y = 0]) => set.has(`${doubled - x},${y}`)))
			return true;
	}
	return false;
};

describe("356. Line Reflection", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			lineReflection([
				[1, 1],
				[-1, 1],
			]),
		).toBeTrue();
		expect(
			lineReflection([
				[1, 1],
				[-1, -1],
			]),
		).toBeFalse();
	});

	it("handles repeated points and points on the line", () => {
		expect(
			lineReflection([
				[0, 0],
				[0, 0],
				[2, 5],
				[-2, 5],
			]),
		).toBeTrue();
		expect(lineReflection([[1, 2]])).toBeTrue();
	});

	it("matches trying every line on random points", () => {
		const random = createRandom(356);
		for (let run = 0; run < 1000; run++) {
			const points = Array.from({ length: random.int(1, 6) }, () => [
				random.int(-3, 3),
				random.int(0, 2),
			]);
			if (random.int(0, 1) === 0) {
				// Mirror the points so a line often exists.
				const axis = random.int(-4, 4);
				for (const [x = 0, y = 0] of [...points]) points.push([axis - x, y]);
			}
			expect(lineReflection(points)).toBe(byBruteForce(points));
		}
	});
});
