import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPairsInTwoArrays as countPairs } from ".";

describe("1885. Count Pairs in Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([2, 1, 2, 1], [1, 2, 1, 2])).toBe(1);
		expect(countPairs([1, 10, 6, 2], [1, 4, 1, 5])).toBe(5);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1885);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const [a, b] = [random.array(n, 1, 10), random.array(n, 1, 10)];
			let pairs = 0;
			for (let i = 0; i < n; i++)
				for (let j = i + 1; j < n; j++)
					if ((a[i] ?? 0) + (a[j] ?? 0) > (b[i] ?? 0) + (b[j] ?? 0)) pairs++;
			expect(countPairs(a, b)).toBe(pairs);
		}
	});
});
