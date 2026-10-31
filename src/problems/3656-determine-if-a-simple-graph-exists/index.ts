/**
 * 3656. Determine if a Simple Graph Exists
 *
 * Whether some simple undirected graph has exactly these vertex degrees.
 *
 * The Erdős–Gallai theorem: sorted decreasingly, the degrees must have an
 * even sum, and for every k the k largest must sum to at most
 * k(k - 1) + Σ min(dᵢ, k) over the rest. As k grows the degrees of at
 * least k shrink to a prefix, so a pointer and prefix sums check each k.
 *
 * @see https://leetcode.com/problems/determine-if-a-simple-graph-exists/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * determineIfASimpleGraphExists([3, 1, 2, 2]); // true
 */
export const determineIfASimpleGraphExists = (
	degrees: readonly number[],
): boolean => {
	const sorted = [...degrees].sort((a, b) => b - a);
	const n = sorted.length;
	const prefix = [0];
	for (const d of sorted) prefix.push((prefix.at(-1) ?? 0) + d);
	if ((prefix[n] ?? 0) % 2 === 1) return false;
	// atLeast: how many degrees are at least k.
	let atLeast = n;
	for (let k = 1; k <= n; k++) {
		while (atLeast > 0 && (sorted[atLeast - 1] ?? 0) < k) atLeast--;
		const capped = Math.max(atLeast, k);
		const rest = (capped - k) * k + (prefix[n] ?? 0) - (prefix[capped] ?? 0);
		if ((prefix[k] ?? 0) > k * (k - 1) + rest) return false;
	}
	return true;
};
