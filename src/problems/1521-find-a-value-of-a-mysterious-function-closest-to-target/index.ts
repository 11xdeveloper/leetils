/**
 * 1521. Find a Value of a Mysterious Function Closest to Target
 *
 * LeetCode's mysterious function is the bitwise AND of `arr[l … r]`. Returns
 * the smallest `|AND − target|` over all subarrays.
 *
 * ANDs of subarrays ending at a position only lose bits as they extend, so
 * there are at most about 20 distinct values; carry that set forward,
 * ANDing each with the next element.
 *
 * @see https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target/
 * @difficulty Hard
 * @timeComplexity O(n log(max))
 * @spaceComplexity O(log(max))
 *
 * @example
 * findAValueOfAMysteriousFunctionClosestToTarget([9, 12, 3, 7, 15], 5); // 2
 */
export const findAValueOfAMysteriousFunctionClosestToTarget = (
	arr: readonly number[],
	target: number,
): number => {
	let ending = new Set<number>();
	let best = Infinity;
	for (const value of arr) {
		const next = new Set([value]);
		for (const previous of ending) next.add(previous & value);
		for (const result of next) best = Math.min(best, Math.abs(result - target));
		ending = next;
	}
	return best;
};
