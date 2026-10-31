/**
 * 3209. Number of Subarrays With AND Value of K
 *
 * Count the subarrays of `nums` whose bitwise AND is `k`.
 *
 * The ANDs of subarrays ending at an index take only ~30 distinct values,
 * since each one loses bits. Carry those values with their counts along,
 * ANDing in each new element.
 *
 * @see https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k/
 * @difficulty Hard
 * @timeComplexity O(n log max)
 * @spaceComplexity O(log max)
 *
 * @example
 * numberOfSubarraysWithAndValueOfK([1, 1, 2], 1); // 3
 */
export const numberOfSubarraysWithAndValueOfK = (
	nums: readonly number[],
	k: number,
): number => {
	let ending = new Map<number, number>();
	let total = 0;
	for (const num of nums) {
		const next = new Map([[num, 1]]);
		for (const [and, count] of ending)
			next.set(and & num, (next.get(and & num) ?? 0) + count);
		total += next.get(k) ?? 0;
		ending = next;
	}
	return total;
};
