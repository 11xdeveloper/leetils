import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { uncrossedLines as maxUncrossedLines } from ".";

describe("1035. Uncrossed Lines", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxUncrossedLines([1, 4, 2], [1, 2, 4])).toBe(2);
		expect(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])).toBe(3);
		expect(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1])).toBe(2);
	});

	it("matches the longest common subsequence by recursion on random inputs", () => {
		const random = createRandom(1035);
		for (let run = 0; run < 500; run++) {
			const a = random.array(random.int(1, 8), 1, 4);
			const b = random.array(random.int(1, 8), 1, 4);
			const lcs = (i: number, j: number): number =>
				i === a.length || j === b.length
					? 0
					: a[i] === b[j]
						? 1 + lcs(i + 1, j + 1)
						: Math.max(lcs(i + 1, j), lcs(i, j + 1));
			expect(maxUncrossedLines(a, b)).toBe(lcs(0, 0));
		}
	});
});
