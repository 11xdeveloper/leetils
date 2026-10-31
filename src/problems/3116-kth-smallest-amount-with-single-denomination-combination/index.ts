const gcd = (a: number, b: number): number => {
	let [x, y] = [a, b];
	while (y) [x, y] = [y, x % y];
	return x;
};

/**
 * 3116. Kth Smallest Amount With Single Denomination Combination
 *
 * The k-th smallest amount that's a multiple of at least one of `coins`.
 *
 * Binary search on the amount, counting multiples of any coin up to it by
 * inclusion-exclusion over subsets of coins, with each subset's least
 * common multiple (capped once it passes any amount searched).
 *
 * @see https://leetcode.com/problems/kth-smallest-amount-with-single-denomination-combination/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ log(k · max))
 * @spaceComplexity O(2ⁿ)
 *
 * @example
 * kthSmallestAmountWithSingleDenominationCombination([3, 6, 9], 3); // 9
 */
export const kthSmallestAmountWithSingleDenominationCombination = (
	coins: readonly number[],
	k: number,
): number => {
	const n = coins.length;
	const hi = k * Math.min(...coins);
	const lcm = new Float64Array(1 << n);
	const sign = new Int8Array(1 << n);
	lcm[0] = 1;
	sign[0] = -1;
	for (let mask = 1; mask < 1 << n; mask++) {
		const low = 31 - Math.clz32(mask & -mask);
		const rest = lcm[mask & (mask - 1)] ?? 1;
		const coin = coins[low] ?? 1;
		lcm[mask] = rest > hi ? rest : (rest / gcd(rest, coin)) * coin;
		sign[mask] = -(sign[mask & (mask - 1)] ?? 0);
	}
	const count = (amount: number): number => {
		let total = 0;
		for (let mask = 1; mask < 1 << n; mask++)
			total += (sign[mask] ?? 0) * Math.floor(amount / (lcm[mask] ?? 1));
		return total;
	};
	let lo = 1;
	let top = hi;
	while (lo < top) {
		const mid = Math.floor((lo + top) / 2);
		if (count(mid) >= k) top = mid;
		else lo = mid + 1;
	}
	return lo;
};
