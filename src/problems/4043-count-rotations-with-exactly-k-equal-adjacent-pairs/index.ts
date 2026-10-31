/**
 * 4043. Count Rotations With Exactly K Equal Adjacent Pairs
 *
 * Counts the rotations of `s` with exactly `k` equal neighbouring pairs.
 *
 * Read the string as a circle: a rotation keeps every cyclic pair except
 * the one across its cut.
 *
 * @see https://leetcode.com/problems/count-rotations-with-exactly-k-equal-adjacent-pairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countRotationsWithExactlyKEqualAdjacentPairs("aab", 1); // 2
 */
export const countRotationsWithExactlyKEqualAdjacentPairs = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	const same = (i: number) => s[i] === s[(i + 1) % n];
	let cyclic = 0;
	for (let i = 0; i < n; i++) if (same(i)) cyclic++;
	let count = 0;
	// Rotation r cuts between positions r - 1 and r.
	for (let r = 0; r < n; r++)
		if (cyclic - (same((r - 1 + n) % n) ? 1 : 0) === k) count++;
	return count;
};
