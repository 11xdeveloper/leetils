/**
 * 1590. Make Sum Divisible by P
 *
 * Returns the length of the shortest subarray (possibly empty, but not the
 * whole array) whose removal leaves a sum divisible by `p`, or -1.
 *
 * The removed part must have the same remainder `r` as the total. With
 * prefix remainders, a subarray ending here works if an earlier prefix had
 * remainder `(current − r) mod p`; remember the latest position of each.
 *
 * @see https://leetcode.com/problems/make-sum-divisible-by-p/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeSumDivisibleByP([6, 3, 5, 2], 9); // 2
 */
export const makeSumDivisibleByP = (
	nums: readonly number[],
	p: number,
): number => {
	const target = nums.reduce((sum, num) => (sum + num) % p, 0);
	if (target === 0) return 0;
	const latest = new Map([[0, -1]]);
	let [prefix, shortest] = [0, nums.length];
	nums.forEach((num, i) => {
		prefix = (prefix + num) % p;
		const start = latest.get((prefix - target + p) % p);
		if (start !== undefined) shortest = Math.min(shortest, i - start);
		latest.set(prefix, i);
	});
	return shortest === nums.length ? -1 : shortest;
};
