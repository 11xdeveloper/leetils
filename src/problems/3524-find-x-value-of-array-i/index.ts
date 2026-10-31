/**
 * 3524. Find X Value of Array I
 *
 * For each x below `k`, count the non-empty subarrays whose product is
 * x mod k.
 *
 * Carry the counts of each product remainder for subarrays ending at the
 * previous element, multiply them all by the new element, and add the new
 * element alone.
 *
 * @see https://leetcode.com/problems/find-x-value-of-array-i/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * findXValueOfArrayI([1, 2, 3, 4, 5], 3); // [9, 2, 4]
 */
export const findXValueOfArrayI = (
	nums: readonly number[],
	k: number,
): number[] => {
	const result = new Array<number>(k).fill(0);
	let ending = new Array<number>(k).fill(0);
	for (const num of nums) {
		const value = num % k;
		const next = new Array<number>(k).fill(0);
		ending.forEach((count, r) => {
			next[(r * value) % k] = (next[(r * value) % k] ?? 0) + count;
		});
		next[value] = (next[value] ?? 0) + 1;
		next.forEach((count, r) => {
			result[r] = (result[r] ?? 0) + count;
		});
		ending = next;
	}
	return result;
};
