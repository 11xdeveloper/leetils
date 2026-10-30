/**
 * 2454. Next Greater Element IV
 *
 * Returns, for each element, its second greater element: the second
 * later element larger than it, or -1.
 *
 * Keep two decreasing stacks: indices awaiting their first greater element
 * and those awaiting their second. A new value settles the second stack's
 * smaller entries, then moves the first stack's smaller entries over,
 * keeping their order.
 *
 * @see https://leetcode.com/problems/next-greater-element-iv/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nextGreaterElementIV([2, 4, 0, 9, 6]); // [9, 6, 6, -1, -1]
 */
export const nextGreaterElementIV = (nums: readonly number[]): number[] => {
	const answer = new Array<number>(nums.length).fill(-1);
	const first: number[] = [];
	const second: number[] = [];
	for (const [i, num] of nums.entries()) {
		while (second.length && (nums[second.at(-1) ?? 0] ?? 0) < num)
			answer[second.pop() ?? 0] = num;
		const moved: number[] = [];
		while (first.length && (nums[first.at(-1) ?? 0] ?? 0) < num)
			moved.push(first.pop() ?? 0);
		second.push(...moved.reverse());
		first.push(i);
	}
	return answer;
};
