/**
 * 798. Smallest Rotation with Highest Score
 *
 * Rotating `nums` by `k` moves the element at index `i` to index
 * `(i - k) mod n`, and each element scores a point if it's no greater than
 * its new index. Returns the smallest `k` with the highest score.
 *
 * Each element scores for all rotations except one contiguous (wrapping)
 * range of `k`. A difference array records where each element's losing
 * range starts and ends, so one pass gives every rotation's score.
 *
 * @see https://leetcode.com/problems/smallest-rotation-with-highest-score/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestRotationWithHighestScore([2, 3, 1, 4, 0]); // 3
 */
export const smallestRotationWithHighestScore = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const change = new Array<number>(n + 1).fill(0);
	for (const [i, num] of nums.entries()) {
		// The element loses its point for k in [i - num + 1, i] (mod n), when that range is non-empty.
		const start = (i - num + 1 + n) % n;
		const end = (i + 1) % n;
		change[start] = (change[start] ?? 0) - 1;
		change[end] = (change[end] ?? 0) + 1;
		if (start >= end) change[0] = (change[0] ?? 0) - 1;
	}

	let best = 0;
	let bestScore = Number.NEGATIVE_INFINITY;
	let score = n;
	for (let k = 0; k < n; k++) {
		score += change[k] ?? 0;
		if (score > bestScore) {
			bestScore = score;
			best = k;
		}
	}
	return best;
};
