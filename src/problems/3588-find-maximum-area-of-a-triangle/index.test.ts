import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMaximumAreaOfATriangle as maxArea } from ".";

/** Tries every triple of points. */
const byBruteForce = (coords: number[][]): number => {
	let best = 0;
	for (const a of coords)
		for (const b of coords)
			for (const c of coords) {
				const [ax = 0, ay = 0] = a;
				const [bx = 0, by = 0] = b;
				const [cx = 0, cy = 0] = c;
				if (ax !== bx && ay !== by) continue;
				best = Math.max(
					best,
					Math.abs((bx - ax) * (cy - ay) - (by - ay) * (cx - ax)),
				);
			}
	return best > 0 ? best : -1;
};

describe("3588. Find Maximum Area of a Triangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxArea([
				[1, 1],
				[1, 2],
				[3, 2],
				[3, 3],
			]),
		).toBe(2);
		expect(
			maxArea([
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		).toBe(-1);
	});

	it("matches trying every triple on random points", () => {
		const random = createRandom(3588);
		for (let run = 0; run < 200; run++) {
			const coords = Array.from({ length: random.int(1, 8) }, () => [
				random.int(1, 6),
				random.int(1, 6),
			]);
			expect(maxArea(coords)).toBe(byBruteForce(coords));
		}
	});
});
