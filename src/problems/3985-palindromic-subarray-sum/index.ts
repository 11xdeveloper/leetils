/**
 * 3985. Palindromic Subarray Sum
 *
 * The largest sum of a subarray that reads the same backwards (elements
 * are positive).
 *
 * With positive elements, the longest palindrome around each centre has
 * the largest sum there; Manacher's algorithm finds them all, and prefix
 * sums give their sums.
 *
 * @see https://leetcode.com/problems/palindromic-subarray-sum/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * palindromicSubarraySum([7, 1, 2, 1, 7, 3, 4, 3, 4]); // 18
 */
export const palindromicSubarraySum = (nums: readonly number[]): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	// Interleave separators so every palindrome has odd length: t[2i + 1] = nums[i].
	const size = 2 * n + 1;
	const at = (i: number) => (i % 2 === 1 ? (nums[(i - 1) / 2] ?? 0) : -1);
	const radius = new Int32Array(size);
	let [center, right] = [0, 0];
	let best = 0;
	for (let i = 0; i < size; i++) {
		let r = i < right ? Math.min(right - i, radius[2 * center - i] ?? 0) : 0;
		while (
			i - r - 1 >= 0 &&
			i + r + 1 < size &&
			at(i - r - 1) === at(i + r + 1)
		)
			r++;
		radius[i] = r;
		if (i + r > right) [center, right] = [i, i + r];
		// Covers t[i - r .. i + r], i.e. nums[(i - r) / 2 .. (i + r) / 2) once rounded.
		const [from, to] = [
			Math.ceil((i - r - 1) / 2),
			Math.floor((i + r - 1) / 2),
		];
		if (from <= to)
			best = Math.max(best, (prefix[to + 1] ?? 0) - (prefix[from] ?? 0));
	}
	return best;
};
