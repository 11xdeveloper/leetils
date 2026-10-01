/**
 * 287. Find the Duplicate Number
 *
 * `nums` holds `n + 1` numbers from 1 to `n`, with exactly one value
 * repeated (possibly many times). Returns that value without modifying the
 * array and using only constant extra space.
 *
 * Treats each index `i` as pointing to index `nums[i]`. Every value is a
 * valid index and index 0 is never pointed to, so following the pointers
 * from 0 enters a cycle, and the repeated value is where the cycle begins.
 * Floyd's cycle detection finds it, as in Linked List Cycle II.
 *
 * @see https://leetcode.com/problems/find-the-duplicate-number/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheDuplicateNumber([1, 3, 4, 2, 2]); // 2
 */
export const findTheDuplicateNumber = (nums: readonly number[]): number => {
	const next = (i: number): number => nums[i] ?? 0;
	let slow = next(0);
	let fast = next(next(0));

	while (slow !== fast) {
		slow = next(slow);
		fast = next(next(fast));
	}

	let fromStart = 0;
	while (fromStart !== slow) {
		fromStart = next(fromStart);
		slow = next(slow);
	}

	return slow;
};
