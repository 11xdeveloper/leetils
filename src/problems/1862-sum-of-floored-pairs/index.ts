/**
 * 1862. Sum of Floored Pairs
 *
 * Returns the sum of `⌊nums[i] / nums[j]⌋` over all ordered pairs, modulo
 * 10^9 + 7.
 *
 * For each distinct divisor `d`, values in `[k·d, (k+1)·d − 1]` contribute
 * `k` each; prefix counts over values give each block at once, and the
 * blocks for all `d` total a harmonic number.
 *
 * @see https://leetcode.com/problems/sum-of-floored-pairs/
 * @difficulty Hard
 * @timeComplexity O(n + M log M) for the largest value M
 * @spaceComplexity O(M)
 *
 * @example
 * sumOfFlooredPairs([2, 5, 9]); // 10
 */
export const sumOfFlooredPairs = (nums: readonly number[]): number => {
	const largest = Math.max(...nums);
	const counts = new Array<number>(largest + 1).fill(0);
	for (const num of nums) counts[num] = (counts[num] ?? 0) + 1;
	const upTo = [0];
	for (let value = 1; value <= largest; value++)
		upTo.push((upTo[value - 1] ?? 0) + (counts[value] ?? 0));
	let total = 0;
	for (let d = 1; d <= largest; d++) {
		const divisors = counts[d] ?? 0;
		if (divisors === 0) continue;
		for (let k = 1; k * d <= largest; k++) {
			const high = Math.min(largest, (k + 1) * d - 1);
			const inBlock = (upTo[high] ?? 0) - (upTo[k * d - 1] ?? 0);
			total =
				(total + ((k * inBlock) % 1_000_000_007) * divisors) % 1_000_000_007;
		}
	}
	return total;
};
