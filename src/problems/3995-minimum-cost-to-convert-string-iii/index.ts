/**
 * 3995. Minimum Cost to Convert String III
 *
 * Turn `source` into `target` by applying rules to unused, non-overlapping
 * ranges: a rule's pattern must match there ('*' matches anything, at a
 * cost of 1 each), and the range becomes its replacement. Returns the
 * least total cost, or -1.
 *
 * Dynamic programming over prefixes: a matching position carries over
 * free, and each rule that matches the source and produces the target at
 * a position jumps over its length.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-convert-string-iii/
 * @difficulty Hard
 * @timeComplexity O(n · r · L)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToConvertStringIII("test", "next", [["*e*t", "next"]], [4]); // 6
 */
export const minimumCostToConvertStringIII = (
	source: string,
	target: string,
	rules: readonly (readonly string[])[],
	costs: readonly number[],
): number => {
	const n = source.length;
	const best = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	const prepared = rules.map(([pattern = "", replacement = ""], i) => ({
		pattern,
		replacement,
		cost: (costs[i] ?? 0) + [...pattern].filter((c) => c === "*").length,
	}));
	for (let i = 0; i < n; i++) {
		const here = best[i] ?? Number.POSITIVE_INFINITY;
		if (here === Number.POSITIVE_INFINITY) continue;
		if (source[i] === target[i]) best[i + 1] = Math.min(best[i + 1] ?? 0, here);
		for (const { pattern, replacement, cost } of prepared) {
			const length = pattern.length;
			if (i + length > n) continue;
			let ok = true;
			for (let j = 0; j < length && ok; j++)
				if (
					(pattern[j] !== "*" && pattern[j] !== source[i + j]) ||
					replacement[j] !== target[i + j]
				)
					ok = false;
			if (ok) best[i + length] = Math.min(best[i + length] ?? 0, here + cost);
		}
	}
	const result = best[n] ?? Number.POSITIVE_INFINITY;
	return result === Number.POSITIVE_INFINITY ? -1 : result;
};
