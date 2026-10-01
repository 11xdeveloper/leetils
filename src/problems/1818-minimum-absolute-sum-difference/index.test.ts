import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAbsoluteSumDifference as minAbsoluteSumDiff } from ".";

describe("1818. Minimum Absolute Sum Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAbsoluteSumDiff([1, 7, 5], [2, 3, 5])).toBe(3);
		expect(minAbsoluteSumDiff([2, 4, 6, 8, 10], [2, 4, 6, 8, 10])).toBe(0);
		expect(minAbsoluteSumDiff([1, 10, 4, 4, 2, 7], [9, 3, 5, 1, 7, 4])).toBe(
			20,
		);
	});

	it("matches trying every replacement on random inputs", () => {
		const random = createRandom(1818);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const [a, b] = [random.array(n, 1, 20), random.array(n, 1, 20)];
			const sum = (x: number[]) =>
				x.reduce((s, v, i) => s + Math.abs(v - (b[i] ?? 0)), 0);
			let best = sum(a);
			for (let i = 0; i < n; i++)
				for (const value of a)
					best = Math.min(best, sum(a.map((v, j) => (j === i ? value : v))));
			expect(minAbsoluteSumDiff(a, b)).toBe(best);
		}
	});
});
