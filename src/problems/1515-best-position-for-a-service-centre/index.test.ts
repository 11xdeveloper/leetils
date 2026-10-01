import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestPositionForAServiceCentre as getMinDistSum } from ".";

const total = (positions: number[][], x: number, y: number) =>
	positions.reduce(
		(sum, [px = 0, py = 0]) => sum + Math.hypot(px - x, py - y),
		0,
	);

describe("1515. Best Position for a Service Centre", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getMinDistSum([
				[0, 1],
				[1, 0],
				[1, 2],
				[2, 1],
			]),
		).toBeCloseTo(4, 5);
		expect(
			getMinDistSum([
				[1, 1],
				[3, 3],
			]),
		).toBeCloseTo(2 * Math.SQRT2, 5);
	});

	it("handles a single customer and repeated customers", () => {
		expect(getMinDistSum([[5, 5]])).toBeCloseTo(0, 5);
		expect(
			getMinDistSum([
				[0, 0],
				[0, 0],
				[10, 0],
			]),
		).toBeCloseTo(10, 5);
	});

	it("is at least as good as a fine grid search on random customers", () => {
		const random = createRandom(1515);
		for (let run = 0; run < 100; run++) {
			const positions = Array.from({ length: random.int(1, 8) }, () => [
				random.int(0, 20),
				random.int(0, 20),
			]);
			let gridBest = Infinity;
			for (let x = 0; x <= 20; x += 0.25) {
				for (let y = 0; y <= 20; y += 0.25)
					gridBest = Math.min(gridBest, total(positions, x, y));
			}
			const result = getMinDistSum(positions);
			expect(result).toBeLessThanOrEqual(gridBest + 1e-6);
			// And close to it, since the grid is fine and the sum is smooth near most optima.
			expect(result).toBeGreaterThan(gridBest - 0.5);
		}
	});
});
