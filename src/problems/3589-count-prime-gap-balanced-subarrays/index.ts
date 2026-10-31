/**
 * 3589. Count Prime-Gap Balanced Subarrays
 *
 * Counts the subarrays holding at least two primes whose largest and
 * smallest prime differ by at most `k`.
 *
 * For each right end, valid left ends run from the earliest start keeping
 * the primes within k (which only moves right, found with monotonic deques
 * of primes) to the second-to-last prime so far.
 *
 * @see https://leetcode.com/problems/count-prime-gap-balanced-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n + V log log V)
 * @spaceComplexity O(n + V)
 *
 * @example
 * countPrimeGapBalancedSubarrays([1, 2, 3], 1); // 2
 */
export const countPrimeGapBalancedSubarrays = (
	nums: readonly number[],
	k: number,
): number => {
	const limit = Math.max(2, ...nums);
	const composite = new Uint8Array(limit + 1);
	composite[0] = composite[1] = 1;
	for (let p = 2; p * p <= limit; p++)
		if (!composite[p]) for (let x = p * p; x <= limit; x += p) composite[x] = 1;
	const highs: number[] = [];
	const lows: number[] = [];
	let [highHead, lowHead, left] = [0, 0, 0];
	let [last, secondLast] = [-1, -1];
	let count = 0;
	nums.forEach((value, i) => {
		if (!composite[value]) {
			[secondLast, last] = [last, i];
			while (highs.length > highHead && (nums[highs.at(-1) ?? 0] ?? 0) <= value)
				highs.pop();
			highs.push(i);
			while (lows.length > lowHead && (nums[lows.at(-1) ?? 0] ?? 0) >= value)
				lows.pop();
			lows.push(i);
			while (
				(nums[highs[highHead] ?? 0] ?? 0) - (nums[lows[lowHead] ?? 0] ?? 0) >
				k
			) {
				left = Math.min(highs[highHead] ?? 0, lows[lowHead] ?? 0) + 1;
				if ((highs[highHead] ?? 0) < left) highHead++;
				if ((lows[lowHead] ?? 0) < left) lowHead++;
			}
		}
		if (secondLast >= left) count += secondLast - left + 1;
	});
	return count;
};
