/**
 * 3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K
 *
 * A number's price is how many of its bits at positions `x`, `2x`, `3x`, …
 * (counting from 1 at the least significant end) are set. Returns the
 * largest `num` whose prices from 1 to `num` add up to at most `k`.
 *
 * Binary search on `num`. Bit b is set in `2^b` of every `2^(b + 1)`
 * numbers in a row, which counts it over 1 to `num` directly. The total
 * price grows at least half as fast as `num`, so `2k + 2^9` bounds the
 * search.
 *
 * @see https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(log² k)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberThatSumOfThePricesIsLessThanOrEqualToK(9, 1); // 6
 */
export const maximumNumberThatSumOfThePricesIsLessThanOrEqualToK = (
	k: number,
	x: number,
): number => {
	const totalPrice = (num: number): number => {
		let total = 0;
		for (let bit = x - 1; 2 ** bit <= num; bit += x) {
			const cycle = 2 ** (bit + 1);
			const half = 2 ** bit;
			total +=
				Math.floor((num + 1) / cycle) * half +
				Math.max(0, ((num + 1) % cycle) - half);
			if (total > k) break;
		}
		return total;
	};
	let lo = 0;
	let hi = 2 * k + 2 ** 9;
	while (lo < hi) {
		const mid = Math.ceil((lo + hi) / 2);
		if (totalPrice(mid) <= k) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
