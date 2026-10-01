/**
 * 1849. Splitting a String Into Descending Consecutive Values
 *
 * Returns whether the digit string `s` splits into two or more numbers
 * that decrease by exactly 1 each time.
 *
 * Try every first number, then search the cuts: each next part must be
 * exactly one less than the previous. A part's value never shrinks as it
 * grows to the right, so stop extending it once it's too large. Values can
 * reach 20 digits, so use BigInt.
 *
 * @see https://leetcode.com/problems/splitting-a-string-into-descending-consecutive-values/
 * @difficulty Medium
 * @timeComplexity O(n^2) cuts tried per first number in the worst case
 * @spaceComplexity O(n)
 *
 * @example
 * splittingAStringIntoDescendingConsecutiveValues("050043"); // true
 */
export const splittingAStringIntoDescendingConsecutiveValues = (
	s: string,
): boolean => {
	const n = s.length;
	const stack: [position: number, previous: bigint][] = [];
	for (let first = 1; first < n; first++)
		stack.push([first, BigInt(s.slice(0, first))]);
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [position, previous] = entry;
		if (position === n) return true;
		for (let end = position + 1; end <= n; end++) {
			const value = BigInt(s.slice(position, end));
			if (value > previous - 1n) break;
			if (value === previous - 1n) stack.push([end, value]);
		}
	}
	return false;
};
