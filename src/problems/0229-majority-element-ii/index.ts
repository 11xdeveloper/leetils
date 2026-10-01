/**
 * 229. Majority Element II
 *
 * Returns every value that appears more than `n / 3` times in `nums`. There
 * can be at most two.
 *
 * The Boyer–Moore vote extended to two candidates: a value different from
 * both cancels one occurrence of each. Any value appearing more than `n / 3`
 * times survives as a candidate, but a candidate might not, so a second pass
 * counts them.
 *
 * @see https://leetcode.com/problems/majority-element-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * majorityElementII([3, 2, 3]); // [3]
 */
export const majorityElementII = (nums: readonly number[]): number[] => {
	let first = 0;
	let second = 1;
	let firstCount = 0;
	let secondCount = 0;

	for (const num of nums) {
		if (num === first) {
			firstCount++;
		} else if (num === second) {
			secondCount++;
		} else if (firstCount === 0) {
			first = num;
			firstCount = 1;
		} else if (secondCount === 0) {
			second = num;
			secondCount = 1;
		} else {
			firstCount--;
			secondCount--;
		}
	}

	const threshold = nums.length / 3;
	return [first, second].filter(
		(candidate) => nums.filter((num) => num === candidate).length > threshold,
	);
};
