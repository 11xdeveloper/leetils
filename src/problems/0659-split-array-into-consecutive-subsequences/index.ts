/**
 * 659. Split Array into Consecutive Subsequences
 *
 * Returns whether the sorted array `nums` can be split into subsequences
 * of consecutive integers (`[3, 4, 5]`), each at least three long.
 *
 * Greedy: each number extends a subsequence ending just before it if there
 * is one, since longer is never worse. Otherwise it must start a new
 * subsequence, which needs the next two numbers to be available right now.
 *
 * @see https://leetcode.com/problems/split-array-into-consecutive-subsequences/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * splitArrayIntoConsecutiveSubsequences([1, 2, 3, 3, 4, 5]); // true: [1, 2, 3] and [3, 4, 5]
 */
export const splitArrayIntoConsecutiveSubsequences = (
	nums: readonly number[],
): boolean => {
	const remaining = new Map<number, number>();
	for (const num of nums) remaining.set(num, (remaining.get(num) ?? 0) + 1);
	// How many subsequences built so far end at each number.
	const endingAt = new Map<number, number>();
	const add = (
		counts: Map<number, number>,
		num: number,
		delta: number,
	): void => {
		counts.set(num, (counts.get(num) ?? 0) + delta);
	};

	for (const num of nums) {
		if (!remaining.get(num)) continue;
		add(remaining, num, -1);
		if (endingAt.get(num - 1)) {
			add(endingAt, num - 1, -1);
			add(endingAt, num, 1);
		} else if (remaining.get(num + 1) && remaining.get(num + 2)) {
			add(remaining, num + 1, -1);
			add(remaining, num + 2, -1);
			add(endingAt, num + 2, 1);
		} else {
			return false;
		}
	}

	return true;
};
