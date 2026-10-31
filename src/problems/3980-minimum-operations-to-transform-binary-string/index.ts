/**
 * 3980. Minimum Operations to Transform Binary String
 *
 * Operations on `s1`: set a 0 to 1, or clear two neighbouring 1s. Returns
 * the fewest operations turning `s1` into `s2`, or -1.
 *
 * Clearing the same pair twice never helps, so decide for each pair of
 * neighbours whether it's cleared. A position cleared p times needs p
 * sets beforehand (one fewer if it starts as 1), plus one more if it must
 * end as 1; with p = 0 it simply needs a set or must already match.
 * Dynamic programming over positions, by whether the pair to the left was
 * cleared.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-transform-binary-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToTransformBinaryString("01", "10"); // 3
 */
export const minimumOperationsToTransformBinaryString = (
	s1: string,
	s2: string,
): number => {
	const n = s1.length;
	const sets = (i: number, cleared: number): number => {
		const [from, to] = [s1[i] === "1" ? 1 : 0, s2[i] === "1" ? 1 : 0];
		if (cleared === 0)
			return from === to ? 0 : from === 0 ? 1 : Number.POSITIVE_INFINITY;
		return cleared - from + to;
	};
	// cost[c]: best so far with the pair (i - 1, i) cleared (c = 1) or not.
	let cost = [0, Number.POSITIVE_INFINITY];
	for (let i = 0; i < n; i++) {
		const next = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
		for (const left of [0, 1])
			for (const right of i + 1 < n ? [0, 1] : [0]) {
				const value = (cost[left] ?? 0) + sets(i, left + right) + right;
				next[right] = Math.min(next[right] ?? 0, value);
			}
		cost = next;
	}
	const best = cost[0] ?? Number.POSITIVE_INFINITY;
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
