/**
 * 1228. Missing Number In Arithmetic Progression
 *
 * One value, neither the first nor the last, was removed from an arithmetic
 * progression, leaving `arr`. Returns the removed value.
 *
 * The full progression runs from `arr[0]` to the last value in `n` equal
 * steps, so the step is known; the first element off the progression marks
 * the gap. (A step of 0 means every value is the same.)
 *
 * @see https://leetcode.com/problems/missing-number-in-arithmetic-progression/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * missingNumberInArithmeticProgression([5, 7, 11, 13]); // 9
 */
export const missingNumberInArithmeticProgression = (
	arr: readonly number[],
): number => {
	const first = arr[0] ?? 0;
	const step = ((arr.at(-1) ?? 0) - first) / arr.length;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] !== first + i * step) return first + i * step;
	}
	return first;
};
