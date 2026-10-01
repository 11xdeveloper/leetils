import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxPointsOnALine } from ".";

/** Checks every line through two points against every point, using the cross product. */
const byBruteForce = (points: number[][]): number => {
	let best = Math.min(points.length, 1);
	for (const [i, [x1 = 0, y1 = 0]] of points.entries()) {
		for (const [x2 = 0, y2 = 0] of points.slice(i + 1)) {
			const onLine = points.filter(
				([x = 0, y = 0]) => (x2 - x1) * (y - y1) === (y2 - y1) * (x - x1),
			).length;
			best = Math.max(best, onLine);
		}
	}
	return best;
};

describe("149. Max Points on a Line", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPointsOnALine([
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		).toBe(3);
		expect(
			maxPointsOnALine([
				[1, 1],
				[3, 2],
				[5, 3],
				[4, 1],
				[2, 3],
				[1, 4],
			]),
		).toBe(4);
	});

	it("handles one point, and vertical and horizontal lines", () => {
		expect(maxPointsOnALine([[0, 0]])).toBe(1);
		expect(
			maxPointsOnALine([
				[2, 1],
				[2, 5],
				[2, -3],
				[0, 0],
			]),
		).toBe(3);
		expect(
			maxPointsOnALine([
				[1, 4],
				[5, 4],
				[-3, 4],
			]),
		).toBe(3);
	});

	it("tells apart slopes that are close as floating-point numbers", () => {
		expect(
			maxPointsOnALine([
				[0, 0],
				[94911151, 94911150],
				[94911152, 94911151],
			]),
		).toBe(2);
	});

	it("matches checking every line on random distinct points", () => {
		const random = createRandom(149);
		for (let run = 0; run < 300; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 12); i > 0; i--) {
				const point = [random.int(-4, 4), random.int(-4, 4)];
				unique.set(point.join(","), point);
			}
			const points = [...unique.values()];
			expect(maxPointsOnALine(points)).toBe(byBruteForce(points));
		}
	});
});
