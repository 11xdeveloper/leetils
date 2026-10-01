import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubmatricesWithAllOnes as numSubmat } from ".";

/** Checks every rectangle. */
const byBruteForce = (mat: number[][]): number => {
	const [m, n] = [mat.length, mat[0]?.length ?? 0];
	let count = 0;
	for (let r1 = 0; r1 < m; r1++) {
		for (let c1 = 0; c1 < n; c1++) {
			for (let r2 = r1; r2 < m; r2++) {
				for (let c2 = c1; c2 < n; c2++) {
					let ones = true;
					for (let r = r1; r <= r2; r++)
						for (let c = c1; c <= c2; c++) if (mat[r]?.[c] !== 1) ones = false;
					if (ones) count++;
				}
			}
		}
	}
	return count;
};

describe("1504. Count Submatrices With All Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numSubmat([
				[1, 0, 1],
				[1, 1, 0],
				[1, 1, 0],
			]),
		).toBe(13);
		expect(
			numSubmat([
				[0, 1, 1, 0],
				[0, 1, 1, 1],
				[1, 1, 1, 0],
			]),
		).toBe(24);
	});

	it("matches checking every rectangle on random matrices", () => {
		const random = createRandom(1504);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 5), random.int(1, 5)];
			const mat = Array.from({ length: m }, () =>
				Array.from({ length: n }, (): number => (random.next() < 0.7 ? 1 : 0)),
			);
			expect(numSubmat(mat)).toBe(byBruteForce(mat));
		}
	});
});
