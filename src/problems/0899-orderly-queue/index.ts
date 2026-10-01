/**
 * 899. Orderly Queue
 *
 * A move takes one of the first `k` letters of `s` and appends it to the
 * end. Returns the lexicographically smallest string reachable.
 *
 * With `k = 1` the only moves are rotations, so it's the smallest rotation.
 * With `k ≥ 2`, two letters can effectively be swapped, which allows any
 * arrangement, so it's the sorted string.
 *
 * @see https://leetcode.com/problems/orderly-queue/
 * @difficulty Hard
 * @timeComplexity O(n^2) for k = 1, O(n log n) otherwise
 * @spaceComplexity O(n)
 *
 * @example
 * orderlyQueue("cba", 1); // "acb"
 */
export const orderlyQueue = (s: string, k: number): string => {
	if (k > 1) return [...s].sort().join("");
	let best = s;
	for (let i = 1; i < s.length; i++) {
		const rotation = s.slice(i) + s.slice(0, i);
		if (rotation < best) best = rotation;
	}
	return best;
};
