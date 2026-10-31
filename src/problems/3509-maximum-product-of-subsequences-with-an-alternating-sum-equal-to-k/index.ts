/**
 * 3509. Maximum Product of Subsequences With an Alternating Sum Equal to K
 *
 * The largest product, at most `limit`, of a non-empty subsequence of
 * `nums` whose alternating sum (adding even positions, subtracting odd
 * ones) is `k`, or -1.
 *
 * Track every reachable state of a subsequence so far: its alternating
 * sum, whether the next element is added or subtracted, and its product
 * capped just above the limit (products of small numbers take few values).
 *
 * @see https://leetcode.com/problems/maximum-product-of-subsequences-with-an-alternating-sum-equal-to-k/
 * @difficulty Hard
 * @timeComplexity O(n · S · P), for S sums and P products reachable
 * @spaceComplexity O(S · P)
 *
 * @example
 * maximumProductOfSubsequencesWithAnAlternatingSumEqualToK([1, 2, 3], 2, 10); // 6
 */
export const maximumProductOfSubsequencesWithAnAlternatingSumEqualToK = (
	nums: readonly number[],
	k: number,
	limit: number,
): number => {
	const over = limit + 1;
	const offset = 12 * nums.length + 1;
	const width = over + 1;
	const encode = (sum: number, subtractNext: number, product: number): number =>
		((sum + offset) * 2 + subtractNext) * width + product;
	let states = new Set<number>();
	for (const num of nums) {
		const next = new Set(states);
		next.add(encode(num, 1, Math.min(num, over)));
		for (const state of states) {
			const product = state % width;
			const rest = Math.floor(state / width);
			const subtract = rest % 2;
			const sum = Math.floor(rest / 2) - offset;
			next.add(
				encode(
					subtract ? sum - num : sum + num,
					1 - subtract,
					Math.min(product * num, over),
				),
			);
		}
		states = next;
	}
	let best = -1;
	for (const state of states) {
		const product = state % width;
		const sum = Math.floor(Math.floor(state / width) / 2) - offset;
		if (sum === k && product <= limit) best = Math.max(best, product);
	}
	return best;
};
