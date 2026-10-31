/**
 * 2289. Steps to Make Array Non-decreasing
 *
 * Each step removes every element smaller than its left neighbour, all at
 * once. Returns the steps until nothing is removed.
 *
 * An element is removed by the nearest larger element to its left, one
 * step after the last element between them is gone. Scan with a stack of
 * (value, step removed), popping those it outlasts.
 *
 * @see https://leetcode.com/problems/steps-to-make-array-non-decreasing/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * stepsToMakeArrayNonDecreasing([5, 3, 4, 4, 7, 3, 6, 11, 8, 5, 11]); // 3
 */
export const stepsToMakeArrayNonDecreasing = (
	nums: readonly number[],
): number => {
	const stack: [value: number, step: number][] = [];
	let steps = 0;
	for (const num of nums) {
		let step = 0;
		for (let top = stack.at(-1); top && top[0] <= num; top = stack.at(-1)) {
			step = Math.max(step, top[1]);
			stack.pop();
		}
		step = stack.length ? step + 1 : 0;
		steps = Math.max(steps, step);
		stack.push([num, step]);
	}
	return steps;
};
