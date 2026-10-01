/**
 * 756. Pyramid Transition Matrix
 *
 * Builds a pyramid of blocks upwards from the row `bottom`, each block
 * resting on two below it. A block may sit on a pair only if the three
 * letters form one of the `allowed` patterns (left, right, top). Returns
 * whether a pyramid can be built all the way to a single top block.
 *
 * Depth-first search row by row, trying every allowed block for each pair.
 * Rows that turn out impossible are remembered so they aren't explored
 * again.
 *
 * @see https://leetcode.com/problems/pyramid-transition-matrix/
 * @difficulty Medium
 * @timeComplexity O(A^n) in the worst case for A letters and a bottom of length n, far less with memoisation
 * @spaceComplexity O(number of rows explored)
 *
 * @example
 * pyramidTransitionMatrix("BCD", ["BCC", "CDE", "CEA", "FFF"]); // true
 */
export const pyramidTransitionMatrix = (
	bottom: string,
	allowed: readonly string[],
): boolean => {
	const tops = new Map<string, string[]>();
	for (const pattern of allowed) {
		const pair = pattern.slice(0, 2);
		const list = tops.get(pair);
		if (list) list.push(pattern.charAt(2));
		else tops.set(pair, [pattern.charAt(2)]);
	}

	const impossible = new Set<string>();
	const build = (row: string, next: string): boolean => {
		if (row.length === 1) return true;
		if (next.length === row.length - 1) {
			if (impossible.has(next)) return false;
			if (build(next, "")) return true;
			impossible.add(next);
			return false;
		}
		for (const top of tops.get(row.slice(next.length, next.length + 2)) ?? []) {
			if (build(row, next + top)) return true;
		}
		return false;
	};

	return build(bottom, "");
};
