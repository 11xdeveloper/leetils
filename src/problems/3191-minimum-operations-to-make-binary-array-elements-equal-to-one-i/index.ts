/**
 * 3191. Minimum Operations to Make Binary Array Elements Equal to One I
 *
 * The fewest flips of three consecutive bits needed to make the binary
 * array all ones, or -1 if impossible.
 *
 * The leftmost 0 can only be fixed by a flip starting there, so flip
 * greedily from the left; anything left in the last two places is stuck.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeBinaryArrayElementsEqualToOneI([0, 1, 1, 1, 0, 0]); // 3
 */
export const minimumOperationsToMakeBinaryArrayElementsEqualToOneI = (
	nums: readonly number[],
): number => {
	const bits = [...nums];
	let flips = 0;
	for (let i = 0; i + 2 < bits.length; i++)
		if (bits[i] === 0) {
			for (let j = i; j < i + 3; j++) bits[j] = 1 - (bits[j] ?? 0);
			flips++;
		}
	return bits.at(-1) === 1 && bits.at(-2) === 1 ? flips : -1;
};
