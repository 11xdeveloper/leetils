/**
 * 3542. Minimum Operations to Convert All Elements to Zero
 *
 * An operation picks a subarray and sets every occurrence of its minimum
 * to 0. Returns the fewest operations to zero all of `nums`.
 *
 * Keep an increasing stack of values still "open". A new value closes
 * everything larger; if it isn't already on top (and isn't 0), it needs an
 * operation of its own.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToConvertAllElementsToZero([3, 1, 2, 1]); // 3
 */
export const minimumOperationsToConvertAllElementsToZero = (
	nums: readonly number[],
): number => {
	const stack: number[] = [];
	let operations = 0;
	for (const num of nums) {
		while (stack.length > 0 && (stack.at(-1) ?? 0) > num) stack.pop();
		if (num > 0 && stack.at(-1) !== num) {
			operations++;
			stack.push(num);
		}
	}
	return operations;
};
