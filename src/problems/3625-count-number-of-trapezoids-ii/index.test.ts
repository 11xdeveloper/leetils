import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumberOfTrapezoidsII as countTrapezoids } from ".";

/** Checks every four points in convex position for parallel opposite sides. */
const byBruteForce = (points: number[][]): number => {
	const cross = (o: number[], a: number[], b: number[]) =>
		((a[0] ?? 0) - (o[0] ?? 0)) * ((b[1] ?? 0) - (o[1] ?? 0)) -
		((a[1] ?? 0) - (o[1] ?? 0)) * ((b[0] ?? 0) - (o[0] ?? 0));
	const parallel = (a: number[], b: number[], c: number[], d: number[]) =>
		((b[0] ?? 0) - (a[0] ?? 0)) * ((d[1] ?? 0) - (c[1] ?? 0)) ===
		((b[1] ?? 0) - (a[1] ?? 0)) * ((d[0] ?? 0) - (c[0] ?? 0));
	const n = points.length;
	let count = 0;
	for (let a = 0; a < n; a++)
		for (let b = a + 1; b < n; b++)
			for (let c = b + 1; c < n; c++)
				for (let d = c + 1; d < n; d++) {
					const [p, q, r, s] = [
						points[a] ?? [],
						points[b] ?? [],
						points[c] ?? [],
						points[d] ?? [],
					];
					const found = [
						[p, q, r, s],
						[p, q, s, r],
						[p, r, q, s],
					].some(([w = [], x = [], y = [], z = []]) => {
						const turns = [
							cross(w, x, y),
							cross(x, y, z),
							cross(y, z, w),
							cross(z, w, x),
						];
						const convex =
							turns.every((t) => t > 0) || turns.every((t) => t < 0);
						return convex && (parallel(w, x, y, z) || parallel(x, y, z, w));
					});
					if (found) count++;
				}
	return count;
};

describe("3625. Count Number of Trapezoids II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countTrapezoids([
				[-3, 2],
				[3, 0],
				[2, 3],
				[3, 2],
				[2, -3],
			]),
		).toBe(2);
		expect(
			countTrapezoids([
				[0, 0],
				[1, 0],
				[0, 1],
				[2, 1],
			]),
		).toBe(1);
	});

	it("matches checking every four points on random sets", () => {
		const random = createRandom(3625);
		for (let run = 0; run < 100; run++) {
			const seen = new Set<string>();
			const points: number[][] = [];
			for (let i = 0; i < random.int(4, 9); i++) {
				const p = [random.int(-3, 3), random.int(-3, 3)];
				if (!seen.has(p.join())) {
					seen.add(p.join());
					points.push(p);
				}
			}
			expect(countTrapezoids(points)).toBe(byBruteForce(points));
		}
	});
});
