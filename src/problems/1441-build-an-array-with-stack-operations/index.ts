/**
 * 1441. Build an Array With Stack Operations
 *
 * Reading `1, 2, …, n` in order, returns the "Push" and "Pop" operations
 * that leave exactly the increasing `target` on the stack, stopping as soon
 * as it's there.
 *
 * Every number up to the last target is pushed; those not in `target` are
 * popped straight away.
 *
 * @see https://leetcode.com/problems/build-an-array-with-stack-operations/
 * @difficulty Medium
 * @timeComplexity O(max(target))
 * @spaceComplexity O(max(target)), for the result
 *
 * @example
 * buildAnArrayWithStackOperations([1, 3], 3); // ["Push", "Push", "Pop", "Push"]
 */
export const buildAnArrayWithStackOperations = (
	target: readonly number[],
	_n: number,
): string[] => {
	const operations: string[] = [];
	let next = 1;
	for (const value of target) {
		for (; next < value; next++) operations.push("Push", "Pop");
		operations.push("Push");
		next++;
	}
	return operations;
};
