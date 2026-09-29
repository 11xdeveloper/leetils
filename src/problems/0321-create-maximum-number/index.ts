/** The largest subsequence of `length` digits, keeping their order. */
const largestSubsequence = (
	digits: readonly number[],
	length: number,
): number[] => {
	const stack: number[] = [];
	let canDrop = digits.length - length;
	for (const digit of digits) {
		while (canDrop > 0 && stack.length > 0 && (stack.at(-1) ?? 0) < digit) {
			stack.pop();
			canDrop--;
		}
		stack.push(digit);
	}
	return stack.slice(0, length);
};

/** Whether a from index i is lexicographically greater than b from index j. */
const greater = (
	a: readonly number[],
	i: number,
	b: readonly number[],
	j: number,
): boolean => {
	let x = i;
	let y = j;
	while (x < a.length && y < b.length && a[x] === b[y]) {
		x++;
		y++;
	}
	return y === b.length || (x < a.length && (a[x] ?? 0) > (b[y] ?? 0));
};

/** The largest interleaving of two digit sequences, keeping each one's order. */
const merge = (a: readonly number[], b: readonly number[]): number[] => {
	const merged: number[] = [];
	for (let i = 0, j = 0; i < a.length || j < b.length; ) {
		merged.push(greater(a, i, b, j) ? (a[i++] ?? 0) : (b[j++] ?? 0));
	}
	return merged;
};

/**
 * 321. Create Maximum Number
 *
 * Returns the largest `k`-digit number, as an array of digits, formed by
 * picking digits from `nums1` and `nums2` while keeping each array's digits
 * in their original order.
 *
 * Tries every split of `k` between the two arrays. For each, a stack picks
 * each array's largest subsequence of that length, and merging them always
 * takes from whichever remainder is lexicographically larger, so a tie is
 * broken by what comes after it. The best result over all splits wins.
 *
 * @see https://leetcode.com/problems/create-maximum-number/
 * @difficulty Hard
 * @timeComplexity O(k * (m + n)^2)
 * @spaceComplexity O(m + n)
 *
 * @example
 * createMaximumNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5); // [9, 8, 6, 5, 3]
 */
export const createMaximumNumber = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number[] => {
	let best: number[] = [];

	for (
		let fromFirst = Math.max(0, k - nums2.length);
		fromFirst <= Math.min(k, nums1.length);
		fromFirst++
	) {
		const candidate = merge(
			largestSubsequence(nums1, fromFirst),
			largestSubsequence(nums2, k - fromFirst),
		);
		if (greater(candidate, 0, best, 0)) best = candidate;
	}

	return best;
};
