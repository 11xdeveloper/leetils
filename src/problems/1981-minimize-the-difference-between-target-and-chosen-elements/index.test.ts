import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeTheDifferenceBetweenTargetAndChosenElements as minimizeTheDifference } from ".";

describe("1981. Minimize the Difference Between Target and Chosen Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimizeTheDifference(
				[
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
				],
				13,
			),
		).toBe(0);
		expect(minimizeTheDifference([[1], [2], [3]], 100)).toBe(94);
		expect(minimizeTheDifference([[1, 2, 9, 8, 7]], 6)).toBe(1);
	});

	it("matches trying every choice on random matrices", () => {
		const random = createRandom(1981);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const mat = Array.from({ length: m }, () => random.array(n, 1, 20));
			const target = random.int(1, 80);
			let sums = [0];
			for (const row of mat) sums = sums.flatMap((s) => row.map((v) => s + v));
			expect(minimizeTheDifference(mat, target)).toBe(
				Math.min(...sums.map((s) => Math.abs(s - target))),
			);
		}
	});
});
