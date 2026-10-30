/**
 * 2557. Maximum Number of Integers to Choose From a Range II
 *
 * Returns the most distinct integers from 1 to `n` you can choose,
 * avoiding `banned`, while keeping their sum at most `maxSum`. Here `n`
 * and `maxSum` are too large to walk one integer at a time.
 *
 * Take allowed integers from smallest up, a whole gap between banned
 * values at a time; in the gap where the budget runs out, binary search
 * how many more fit.
 *
 * @see https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-ii/
 * @difficulty Medium
 * @timeComplexity O(b log b + b log n)
 * @spaceComplexity O(b)
 *
 * @example
 * maximumNumberOfIntegersToChooseFromARangeII([4, 3, 5, 6], 7, 18); // 3
 */
export const maximumNumberOfIntegersToChooseFromARangeII = (
	banned: readonly number[],
	n: number,
	maxSum: number,
): number => {
	const walls = [...new Set(banned)]
		.filter((b) => b <= n)
		.sort((a, b) => a - b);
	walls.push(n + 1);
	/** The sum of the `count` integers starting at `start`. */
	const runSum = (start: number, count: number): number =>
		count * start + (count * (count - 1)) / 2;

	let chosen = 0;
	let budget = maxSum;
	let start = 1;
	for (const wall of walls) {
		const length = wall - start;
		if (length > 0) {
			if (runSum(start, length) <= budget) {
				budget -= runSum(start, length);
				chosen += length;
			} else {
				let low = 0;
				let high = length;
				while (low < high) {
					const mid = Math.ceil((low + high) / 2);
					if (runSum(start, mid) <= budget) low = mid;
					else high = mid - 1;
				}
				return chosen + low;
			}
		}
		start = wall + 1;
	}
	return chosen;
};
