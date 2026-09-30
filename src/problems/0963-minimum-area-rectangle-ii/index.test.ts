import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAreaRectangleII as minAreaFreeRect } from ".";

/** Tries every choice of three corners, checking for a right angle and the fourth point. */
const byBruteForce = (points: number[][]): number => {
	const present = new Set(points.map((p) => p.join()));
	let smallest = Number.POSITIVE_INFINITY;
	for (const a of points) {
		for (const b of points) {
			for (const c of points) {
				if (a === b || a === c || b === c) continue;
				const [ax = 0, ay = 0] = a;
				const [bx = 0, by = 0] = b;
				const [cx = 0, cy = 0] = c;
				if ((bx - ax) * (cx - ax) + (by - ay) * (cy - ay) !== 0) continue;
				if (!present.has(`${bx + cx - ax},${by + cy - ay}`)) continue;
				smallest = Math.min(
					smallest,
					Math.hypot(bx - ax, by - ay) * Math.hypot(cx - ax, cy - ay),
				);
			}
		}
	}
	return smallest === Number.POSITIVE_INFINITY ? 0 : smallest;
};

describe("963. Minimum Area Rectangle II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minAreaFreeRect([
				[1, 2],
				[2, 1],
				[1, 0],
				[0, 1],
			]),
		).toBeCloseTo(2, 5);
		expect(
			minAreaFreeRect([
				[0, 1],
				[2, 1],
				[1, 1],
				[1, 0],
				[2, 0],
			]),
		).toBeCloseTo(1, 5);
		expect(
			minAreaFreeRect([
				[0, 3],
				[1, 2],
				[3, 1],
				[1, 3],
				[2, 1],
			]),
		).toBe(0);
	});

	it("matches checking every right angle on random points", () => {
		const random = createRandom(963);
		for (let run = 0; run < 300; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 10); i > 0; i--) {
				const point = [random.int(0, 4), random.int(0, 4)];
				unique.set(point.join(), point);
			}
			const points = [...unique.values()];
			expect(minAreaFreeRect(points)).toBeCloseTo(byBruteForce(points), 5);
		}
	});
});
