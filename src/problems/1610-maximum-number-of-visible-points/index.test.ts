import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfVisiblePoints as visiblePoints } from ".";

/** Starts the view at each point's direction in turn and counts what's inside. */
const byBruteForce = (
	points: number[][],
	angle: number,
	[x0 = 0, y0 = 0]: number[],
): number => {
	const here = points.filter(([x, y]) => x === x0 && y === y0).length;
	const angles = points
		.filter(([x, y]) => x !== x0 || y !== y0)
		.map(([x = 0, y = 0]) => (Math.atan2(y - y0, x - x0) * 180) / Math.PI);
	let most = 0;
	for (const start of angles) {
		const seen = angles.filter(
			(a) => (((a - start) % 360) + 360) % 360 <= angle + 1e-9,
		).length;
		most = Math.max(most, seen);
	}
	return most + here;
};

describe("1610. Maximum Number of Visible Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			visiblePoints(
				[
					[2, 1],
					[2, 2],
					[3, 3],
				],
				90,
				[1, 1],
			),
		).toBe(3);
		expect(
			visiblePoints(
				[
					[2, 1],
					[2, 2],
					[3, 4],
					[1, 1],
				],
				90,
				[1, 1],
			),
		).toBe(4);
		expect(
			visiblePoints(
				[
					[1, 0],
					[2, 1],
				],
				13,
				[1, 1],
			),
		).toBe(1);
	});

	it("handles views wrapping past west and a zero-width view", () => {
		expect(
			visiblePoints(
				[
					[0, 1],
					[0, -1],
				],
				0,
				[1, 0],
			),
		).toBe(1);
		expect(
			visiblePoints(
				[
					[0, 1],
					[0, -1],
					[-1, 0],
				],
				90,
				[1, 0],
			),
		).toBe(3);
	});

	it("matches trying each starting direction on random points", () => {
		const random = createRandom(1610);
		for (let run = 0; run < 300; run++) {
			const points = Array.from({ length: random.int(1, 10) }, () => [
				random.int(0, 6),
				random.int(0, 6),
			]);
			const angle = random.int(0, 359);
			const location = [random.int(0, 6), random.int(0, 6)];
			expect(visiblePoints(points, angle, location)).toBe(
				byBruteForce(points, angle, location),
			);
		}
	});
});
