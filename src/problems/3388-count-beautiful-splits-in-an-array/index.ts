/**
 * 3388. Count Beautiful Splits in an Array
 *
 * Count the ways to split `nums` into three non-empty parts where the first
 * is a prefix of the second or the second is a prefix of the third.
 *
 * A Z-function from position i gives the longest common prefix of the
 * suffixes starting at i and j for every j, which settles both conditions:
 * from 0 for the first part, and from the second part's start for the
 * second.
 *
 * @see https://leetcode.com/problems/count-beautiful-splits-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * countBeautifulSplitsInAnArray([1, 1, 2, 1]); // 2
 */
export const countBeautifulSplitsInAnArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const zFrom = (start: number): Int32Array => {
		const length = n - start;
		const z = new Int32Array(length);
		z[0] = length;
		for (let i = 1, left = 0, right = 0; i < length; i++) {
			let match = i < right ? Math.min(right - i, z[i - left] ?? 0) : 0;
			while (
				i + match < length &&
				nums[start + match] === nums[start + i + match]
			)
				match++;
			z[i] = match;
			if (i + match > right) {
				left = i;
				right = i + match;
			}
		}
		return z;
	};
	const whole = zFrom(0);
	let count = 0;
	for (let i = 1; i < n - 1; i++) {
		const fromSecond = zFrom(i);
		for (let j = i + 1; j < n; j++) {
			const firstPrefix = j - i >= i && (whole[i] ?? 0) >= i;
			const secondPrefix = n - j >= j - i && (fromSecond[j - i] ?? 0) >= j - i;
			if (firstPrefix || secondPrefix) count++;
		}
	}
	return count;
};
