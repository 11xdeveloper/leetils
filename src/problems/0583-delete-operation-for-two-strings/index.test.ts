import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { deleteOperationForTwoStrings as minDistance } from ".";

/** Deletes from either end recursively, with memoisation. */
const byRecursion = (a: string, b: string): number => {
	const memo = new Map<string, number>();
	const search = (i: number, j: number): number => {
		if (i === a.length) return b.length - j;
		if (j === b.length) return a.length - i;
		const key = `${i},${j}`;
		const known = memo.get(key);
		if (known !== undefined) return known;
		const result =
			a.charAt(i) === b.charAt(j)
				? search(i + 1, j + 1)
				: 1 + Math.min(search(i + 1, j), search(i, j + 1));
		memo.set(key, result);
		return result;
	};
	return search(0, 0);
};

describe("583. Delete Operation for Two Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDistance("sea", "eat")).toBe(2);
		expect(minDistance("leetcode", "etco")).toBe(4);
	});

	it("matches recursive deletion on random inputs", () => {
		const random = createRandom(583);
		for (let run = 0; run < 1000; run++) {
			const a = random.string(random.int(1, 10), "abc");
			const b = random.string(random.int(1, 10), "abc");
			expect(minDistance(a, b)).toBe(byRecursion(a, b));
		}
	});
});
