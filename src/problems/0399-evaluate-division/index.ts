/**
 * 399. Evaluate Division
 *
 * Given equations `a / b = value`, answers each query `c / d`, or -1 if it
 * can't be worked out (including when a variable never appears).
 *
 * Weighted union–find: each variable stores its ratio to its set's root, so
 * two variables in the same set divide by comparing those ratios. Joining
 * sets with an equation fixes the ratio between their roots.
 *
 * @see https://leetcode.com/problems/evaluate-division/
 * @difficulty Medium
 * @timeComplexity O((e + q) α(n)), nearly linear
 * @spaceComplexity O(n)
 *
 * @example
 * evaluateDivision([["a", "b"], ["b", "c"]], [2, 3], [["a", "c"], ["b", "a"], ["a", "e"]]); // [6, 0.5, -1]
 */
export const evaluateDivision = (
	equations: readonly (readonly string[])[],
	values: readonly number[],
	queries: readonly (readonly string[])[],
): number[] => {
	const parent = new Map<string, string>();
	// ratio.get(x): the value of x / parent(x).
	const ratio = new Map<string, number>();

	const find = (x: string): [root: string, toRoot: number] => {
		const p = parent.get(x);
		if (p === undefined || p === x) return [x, 1];
		const [root, parentToRoot] = find(p);
		const toRoot = (ratio.get(x) ?? 1) * parentToRoot;
		parent.set(x, root);
		ratio.set(x, toRoot);
		return [root, toRoot];
	};

	for (const [i, [a = "", b = ""]] of equations.entries()) {
		for (const v of [a, b]) {
			if (!parent.has(v)) {
				parent.set(v, v);
				ratio.set(v, 1);
			}
		}
		const [rootA, aToRoot] = find(a);
		const [rootB, bToRoot] = find(b);
		if (rootA === rootB) continue;
		// a / b = value, so rootA / rootB = value * bToRoot / aToRoot.
		parent.set(rootA, rootB);
		ratio.set(rootA, ((values[i] ?? 1) * bToRoot) / aToRoot);
	}

	return queries.map(([c = "", d = ""]) => {
		if (!parent.has(c) || !parent.has(d)) return -1;
		const [rootC, cToRoot] = find(c);
		const [rootD, dToRoot] = find(d);
		return rootC === rootD ? cToRoot / dToRoot : -1;
	});
};
