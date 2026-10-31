/**
 * 3113. Find the Number of Subarrays Where Boundary Elements Are Maximum
 *
 * Count the subarrays whose first and last elements both equal the
 * subarray's maximum.
 *
 * Keep a stack of values in decreasing order, each with how many times it
 * has appeared since a bigger value. A new element pops smaller values
 * (they can't start a subarray past it), then pairs with every earlier copy
 * of itself still on the stack, plus itself alone.
 *
 * @see https://leetcode.com/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheNumberOfSubarraysWhereBoundaryElementsAreMaximum([1, 4, 3, 3, 2]); // 6
 */
export const findTheNumberOfSubarraysWhereBoundaryElementsAreMaximum = (
	nums: readonly number[],
): number => {
	const stack: [value: number, count: number][] = [];
	let total = 0;
	for (const num of nums) {
		while (stack.length > 0 && (stack.at(-1)?.[0] ?? 0) < num) stack.pop();
		const top = stack.at(-1);
		if (top && top[0] === num) top[1]++;
		else stack.push([num, 1]);
		total += stack.at(-1)?.[1] ?? 0;
	}
	return total;
};
