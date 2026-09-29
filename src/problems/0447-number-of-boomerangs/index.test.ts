import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfBoomerangs } from ".";

const byBruteForce = (points: number[][]): number => {
	const distance = (a: number[], b: number[]) =>
		((a[0] ?? 0) - (b[0] ?? 0)) ** 2 + ((a[1] ?? 0) - (b[1] ?? 0)) ** 2;
	let count = 0;
	for (const [i, a] of points.entries()) {
		for (const [j, b] of points.entries()) {
			for (const [k, c] of points.entries()) {
				if (i !== j && i !== k && j !== k && distance(a, b) === distance(a, c))
					count++;
			}
		}
	}
	return count;
};

describe("447. Number of Boomerangs", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfBoomerangs([
				[0, 0],
				[1, 0],
				[2, 0],
			]),
		).toBe(2);
		expect(
			numberOfBoomerangs([
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		).toBe(2);
		expect(numberOfBoomerangs([[1, 1]])).toBe(0);
	});

	it("matches checking every triple on random distinct points", () => {
		const random = createRandom(447);
		for (let run = 0; run < 300; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 8); i > 0; i--) {
				const point = [random.int(-3, 3), random.int(-3, 3)];
				unique.set(point.join(), point);
			}
			const points = [...unique.values()];
			expect(numberOfBoomerangs(points)).toBe(byBruteForce(points));
		}
	});
});
