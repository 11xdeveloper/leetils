/**
 * 18. 4Sum
 *
 * Returns every unique quadruplet of values from `nums`, at four different
 * indices, that adds up to `target`.
 *
 * Sorts a copy, fixes the first two values with nested loops, and finds the
 * last two with pointers moving in from both ends of the rest. Repeated
 * values are skipped so no quadruplet is returned twice.
 *
 * @see https://leetcode.com/problems/4sum/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * fourSum([1, 0, -1, 0, -2, 2], 0); // [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
 */
export const fourSum = (
	nums: readonly number[],
	target: number,
): number[][] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const quadruplets: number[][] = [];

	for (let i = 0; i < sorted.length - 3; i++) {
		const first = sorted[i] ?? 0;
		if (i > 0 && first === sorted[i - 1]) continue;

		for (let j = i + 1; j < sorted.length - 2; j++) {
			const second = sorted[j] ?? 0;
			if (j > i + 1 && second === sorted[j - 1]) continue;

			let left = j + 1;
			let right = sorted.length - 1;
			while (left < right) {
				const third = sorted[left] ?? 0;
				const fourth = sorted[right] ?? 0;
				const sum = first + second + third + fourth;

				if (sum < target) {
					left++;
				} else if (sum > target) {
					right--;
				} else {
					quadruplets.push([first, second, third, fourth]);
					while (left < right && sorted[left] === third) left++;
					while (left < right && sorted[right] === fourth) right--;
				}
			}
		}
	}

	return quadruplets;
};
