/**
 * 1818. Minimum Absolute Sum Difference
 *
 * Replacing at most one element of `nums1` with another element of
 * `nums1`, returns the smallest `Σ |nums1[i] − nums2[i]|`, modulo
 * 10^9 + 7.
 *
 * For each position, binary-search a sorted copy of `nums1` for the value
 * closest to `nums2[i]`; keep the replacement that saves the most.
 *
 * @see https://leetcode.com/problems/minimum-absolute-sum-difference/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAbsoluteSumDifference([1, 10, 4, 4, 2, 7], [9, 3, 5, 1, 7, 4]); // 20
 */
export const minimumAbsoluteSumDifference = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const sorted = nums1.toSorted((a, b) => a - b);
	let [total, saving] = [0, 0];
	for (const [i, a] of nums1.entries()) {
		const b = nums2[i] ?? 0;
		const current = Math.abs(a - b);
		total += current;
		let [low, high] = [0, sorted.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid] ?? 0) < b) low = mid + 1;
			else high = mid;
		}
		for (const j of [low - 1, low]) {
			const candidate = sorted[j];
			if (candidate !== undefined)
				saving = Math.max(saving, current - Math.abs(candidate - b));
		}
	}
	return (total - saving) % 1_000_000_007;
};
