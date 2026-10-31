/**
 * 3162. Find the Number of Good Pairs I
 *
 * Count the pairs (i, j) where `nums1[i]` is divisible by `nums2[j] · k`.
 *
 * Count the values in `nums1`, then for each distinct divisor
 * `nums2[j] · k`, add up the counts of its multiples. Summed over divisors,
 * that's a harmonic series in the largest value.
 *
 * @see https://leetcode.com/problems/find-the-number-of-good-pairs-i/
 * @difficulty Easy
 * @timeComplexity O(n + m + V log V), for values up to V
 * @spaceComplexity O(V)
 *
 * @example
 * findTheNumberOfGoodPairsI([1, 2, 4, 12], [2, 4], 3); // 2
 */
export const findTheNumberOfGoodPairsI = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number => {
	const max = Math.max(...nums1);
	const counts = new Int32Array(max + 1);
	for (const num of nums1) counts[num] = (counts[num] ?? 0) + 1;
	const divisors = new Map<number, number>();
	for (const num of nums2)
		divisors.set(num * k, (divisors.get(num * k) ?? 0) + 1);
	let pairs = 0;
	for (const [divisor, times] of divisors) {
		let multiples = 0;
		for (let value = divisor; value <= max; value += divisor)
			multiples += counts[value] ?? 0;
		pairs += multiples * times;
	}
	return pairs;
};
