/**
 * 15. 3Sum
 *
 * Returns every unique triplet of values from `nums`, at three different
 * indices, that adds up to 0.
 *
 * Sorts a copy, fixes each first value in turn, and finds the other two with
 * pointers moving in from both ends of the rest. Repeated values are skipped
 * so no triplet is returned twice.
 *
 * @see https://leetcode.com/problems/3sum/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * threeSum([-1, 0, 1, 2, -1, -4]); // [[-1, -1, 2], [-1, 0, 1]]
 */
export const threeSum = (nums: readonly number[]): number[][] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const triplets: number[][] = [];

	for (let i = 0; i < sorted.length - 2; i++) {
		const first = sorted[i] ?? 0;
		if (first > 0) break;
		if (i > 0 && first === sorted[i - 1]) continue;

		let left = i + 1;
		let right = sorted.length - 1;
		while (left < right) {
			const second = sorted[left] ?? 0;
			const third = sorted[right] ?? 0;
			const sum = first + second + third;

			if (sum < 0) {
				left++;
			} else if (sum > 0) {
				right--;
			} else {
				triplets.push([first, second, third]);
				while (left < right && sorted[left] === second) left++;
				while (left < right && sorted[right] === third) right--;
			}
		}
	}

	return triplets;
};
