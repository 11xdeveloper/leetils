import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfDartsInsideOfACircularDartboard as numPoints } from ".";

/**
 * Angular sweep: for each dart on the circle's edge, every other dart is
 * covered for an arc of centre angles; the most overlapping arcs wins.
 */
const bySweep = (darts: number[][], r: number): number => {
	let best = 1;
	for (const [px = 0, py = 0] of darts) {
		const events: [number, number][] = [];
		for (const [qx = 0, qy = 0] of darts) {
			const d = Math.hypot(qx - px, qy - py);
			if (d === 0 || d > 2 * r + 1e-9) continue;
			const [angle, spread] = [
				Math.atan2(qy - py, qx - px),
				Math.acos(Math.min(1, d / (2 * r))),
			];
			events.push([angle - spread - 1e-9, 1], [angle + spread + 1e-9, -1]);
		}
		// Arcs may wrap around, so sweep twice round.
		const doubled = [
			...events,
			...events.map(([a, delta]): [number, number] => [a + 2 * Math.PI, delta]),
		];
		doubled.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
		let current = 0;
		for (const [, delta] of doubled) {
			current += delta;
			best = Math.max(best, Math.min(darts.length, current + 1));
		}
	}
	return best;
};

describe("1453. Maximum Number of Darts Inside of a Circular Dartboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numPoints(
				[
					[-2, 0],
					[2, 0],
					[0, 2],
					[0, -2],
				],
				2,
			),
		).toBe(4);
		expect(
			numPoints(
				[
					[-3, 0],
					[3, 0],
					[2, 6],
					[5, 4],
					[0, 9],
					[7, 8],
				],
				5,
			),
		).toBe(5);
	});

	it("covers a single dart", () => {
		expect(numPoints([[1, 1]], 1)).toBe(1);
		expect(
			numPoints(
				[
					[0, 0],
					[10, 0],
				],
				1,
			),
		).toBe(1);
	});

	it("agrees with an angular sweep on random darts", () => {
		const random = createRandom(1453);
		for (let run = 0; run < 200; run++) {
			const cells = [...new Set(random.array(random.int(1, 12), 0, 399))];
			const darts = cells.map((cell) => [
				Math.floor(cell / 20) - 10,
				(cell % 20) - 10,
			]);
			const r = random.int(1, 6);
			expect(numPoints(darts, r)).toBe(
				Math.min(bySweep(darts, r), darts.length),
			);
		}
	});
});
