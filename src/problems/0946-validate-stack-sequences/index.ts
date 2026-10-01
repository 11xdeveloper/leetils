/**
 * 946. Validate Stack Sequences
 *
 * Returns whether pushing the distinct values `pushed` in order, with pops
 * in between, could produce the pop order `popped`.
 *
 * Simulates it: push each value, then pop while the top is the next value
 * to be popped. It works if everything gets popped.
 *
 * @see https://leetcode.com/problems/validate-stack-sequences/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]); // true
 */
export const validateStackSequences = (
	pushed: readonly number[],
	popped: readonly number[],
): boolean => {
	const stack: number[] = [];
	let next = 0;
	for (const value of pushed) {
		stack.push(value);
		while (stack.length > 0 && stack.at(-1) === popped[next]) {
			stack.pop();
			next++;
		}
	}
	return next === popped.length;
};
