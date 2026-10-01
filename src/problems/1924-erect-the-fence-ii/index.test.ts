import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { erectTheFenceII as outerTrees } from ".";

/** The smallest radius among circles through two or three trees that enclose all of them. */
const smallestRadius = (trees: number[][]): number => {
	const candidates: [number, number, number][] = trees.map(([x = 0, y = 0]) => [
		x,
		y,
		0,
	]);
	for (const [i, a] of trees.entries()) {
		for (const [j, b] of trees.entries()) {
			if (j <= i) continue;
			const [ax = 0, ay = 0] = a;
			const [bx = 0, by = 0] = b;
			candidates.push([
				(ax + bx) / 2,
				(ay + by) / 2,
				Math.hypot(ax - bx, ay - by) / 2,
			]);
			for (const [k, c] of trees.entries()) {
				if (k <= j) continue;
				const [cx = 0, cy = 0] = c;
				const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
				if (d === 0) continue;
				const [a2, b2, c2] = [
					ax * ax + ay * ay,
					bx * bx + by * by,
					cx * cx + cy * cy,
				];
				const x = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d;
				const y = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d;
				candidates.push([x, y, Math.hypot(ax - x, ay - y)]);
			}
		}
	}
	const enclosing = candidates.filter(([x, y, r]) =>
		trees.every(([px = 0, py = 0]) => Math.hypot(px - x, py - y) <= r + 1e-7),
	);
	return Math.min(...enclosing.map(([, , r]) => r));
};

describe("1924. Erect the Fence II", () => {
	it("solves the examples from the problem statement", () => {
		const [x1 = 0, y1 = 0, r1 = 0] = outerTrees([
			[1, 1],
			[2, 2],
			[2, 0],
			[2, 4],
			[3, 3],
			[4, 2],
		]);
		expect([x1, y1, r1].map((v) => Number(v.toFixed(5)))).toEqual([2, 2, 2]);
		const [x2 = 0, y2 = 0, r2 = 0] = outerTrees([
			[1, 2],
			[2, 2],
			[4, 2],
		]);
		expect([x2, y2, r2].map((v) => Number(v.toFixed(5)))).toEqual([
			2.5, 2, 1.5,
		]);
	});

	it("finds the smallest enclosing circle of random trees", () => {
		const random = createRandom(1924);
		for (let run = 0; run < 200; run++) {
			const trees = Array.from({ length: random.int(1, 10) }, () => [
				random.int(0, 20),
				random.int(0, 20),
			]);
			const [x = 0, y = 0, r = 0] = outerTrees(trees);
			for (const [px = 0, py = 0] of trees)
				expect(Math.hypot(px - x, py - y)).toBeLessThanOrEqual(r + 1e-6);
			expect(r).toBeCloseTo(smallestRadius(trees), 5);
		}
	});
});
