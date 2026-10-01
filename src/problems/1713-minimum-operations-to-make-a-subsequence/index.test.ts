import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeASubsequence as minOperations } from ".";

/** Target length minus the longest common subsequence. */
const byBruteForce = (target: number[], arr: number[]): number => {
	const lcs = Array.from({ length: target.length + 1 }, () =>
		new Array<number>(arr.length + 1).fill(0),
	);
	for (let i = 1; i <= target.length; i++) {
		for (let j = 1; j <= arr.length; j++) {
			const row = lcs[i];
			if (!row) continue;
			row[j] =
				target[i - 1] === arr[j - 1]
					? (lcs[i - 1]?.[j - 1] ?? 0) + 1
					: Math.max(lcs[i - 1]?.[j] ?? 0, row[j - 1] ?? 0);
		}
	}
	return target.length - (lcs[target.length]?.[arr.length] ?? 0);
};

describe("1713. Minimum Operations to Make a Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([5, 1, 3], [9, 4, 2, 3, 4])).toBe(2);
		expect(minOperations([6, 4, 8, 1, 3, 2], [4, 7, 6, 2, 3, 8, 6, 1])).toBe(3);
	});

	it("matches the longest common subsequence on random inputs", () => {
		const random = createRandom(1713);
		for (let run = 0; run < 300; run++) {
			const target = [...new Set(random.array(random.int(1, 8), 1, 10))];
			const arr = random.array(random.int(1, 12), 1, 10);
			expect(minOperations(target, arr)).toBe(byBruteForce(target, arr));
		}
	});
});
