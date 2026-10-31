import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAreaRectangleWithPointConstraintsI as maxRectangleArea } from ".";

/** Tries every pair of opposite corners. */
const byBruteForce = (points: number[][]): number => {
	const has = new Set(points.map((p) => p.join()));
	let best = -1;
	for (const [x1 = 0, y1 = 0] of points)
		for (const [x2 = 0, y2 = 0] of points) {
			if (
				x2 <= x1 ||
				y2 <= y1 ||
				!has.has(`${x1},${y2}`) ||
				!has.has(`${x2},${y1}`)
			)
				continue;
			const inside = points.filter(
				([x = 0, y = 0]) => x >= x1 && x <= x2 && y >= y1 && y <= y2,
			).length;
			if (inside === 4) best = Math.max(best, (x2 - x1) * (y2 - y1));
		}
	return best;
};

describe("3380. Maximum Area Rectangle With Point Constraints I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxRectangleArea([
				[1, 1],
				[1, 3],
				[3, 1],
				[3, 3],
			]),
		).toBe(4);
		expect(
			maxRectangleArea([
				[1, 1],
				[1, 3],
				[3, 1],
				[3, 3],
				[2, 2],
			]),
		).toBe(-1);
		expect(
			maxRectangleArea([
				[1, 1],
				[1, 3],
				[3, 1],
				[3, 3],
				[1, 2],
				[3, 2],
			]),
		).toBe(2);
	});

	it("matches trying every corner pair on random points", () => {
		const random = createRandom(3380);
		for (let run = 0; run < 300; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 10); i > 0; i--) {
				const p = [random.int(0, 4), random.int(0, 4)];
				unique.set(p.join(), p);
			}
			const points = [...unique.values()];
			expect(maxRectangleArea(points)).toBe(byBruteForce(points));
		}
	});
});
