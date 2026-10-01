import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumScoreTriangulationOfPolygon as minScoreTriangulation } from ".";

describe("1039. Minimum Score Triangulation of Polygon", () => {
	it("solves the examples from the problem statement", () => {
		expect(minScoreTriangulation([1, 2, 3])).toBe(6);
		expect(minScoreTriangulation([3, 7, 4, 5])).toBe(144);
		expect(minScoreTriangulation([1, 3, 1, 4, 1, 5])).toBe(13);
	});

	it("matches plain recursion on random polygons", () => {
		const random = createRandom(1039);
		for (let run = 0; run < 300; run++) {
			const values = random.array(random.int(3, 8), 1, 10);
			const solve = (i: number, j: number): number => {
				let best = j - i < 2 ? 0 : Number.POSITIVE_INFINITY;
				for (let k = i + 1; k < j; k++)
					best = Math.min(
						best,
						solve(i, k) +
							solve(k, j) +
							(values[i] ?? 0) * (values[k] ?? 0) * (values[j] ?? 0),
					);
				return best;
			};
			expect(minScoreTriangulation(values)).toBe(solve(0, values.length - 1));
		}
	});
});
