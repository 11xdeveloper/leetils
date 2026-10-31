/**
 * 3574. Maximize Subarray GCD Score
 *
 * Double at most `k` elements of `nums`, each at most once, then score a
 * subarray as its length times the gcd of its elements. Returns the best
 * score.
 *
 * Doubling can at most double a subarray's gcd, and does exactly when every
 * element with the fewest factors of 2 gets doubled. So for each subarray
 * track its gcd, the fewest factors of 2 and how many elements have that
 * few; it doubles when that count is at most k.
 *
 * @see https://leetcode.com/problems/maximize-subarray-gcd-score/
 * @difficulty Hard
 * @timeComplexity O(n² log V)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeSubarrayGcdScore([2, 4], 1); // 8
 */
export const maximizeSubarrayGcdScore = (
	nums: readonly number[],
	k: number,
): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const twos = nums.map((num) => {
		let count = 0;
		for (let x = num; x % 2 === 0; x /= 2) count++;
		return count;
	});
	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		let g = 0;
		let fewest = Number.POSITIVE_INFINITY;
		let count = 0;
		for (let j = i; j < nums.length; j++) {
			g = gcd(g, nums[j] ?? 0);
			const t = twos[j] ?? 0;
			if (t < fewest) [fewest, count] = [t, 1];
			else if (t === fewest) count++;
			best = Math.max(best, (j - i + 1) * (count <= k ? 2 * g : g));
		}
	}
	return best;
};
