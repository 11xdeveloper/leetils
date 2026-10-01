/**
 * 989. Add to Array-Form of Integer
 *
 * `num` is a number's digits, most significant first. Returns the digits of
 * that number plus `k`.
 *
 * Adds `k` into the digits from the right, carrying whatever doesn't fit
 * in a digit onwards, and prepends leftover carry digits.
 *
 * @see https://leetcode.com/problems/add-to-array-form-of-integer/
 * @difficulty Easy
 * @timeComplexity O(n + log k)
 * @spaceComplexity O(n + log k) for the result
 *
 * @example
 * addToArrayFormOfInteger([1, 2, 0, 0], 34); // [1, 2, 3, 4]
 */
export const addToArrayFormOfInteger = (
	num: readonly number[],
	k: number,
): number[] => {
	const result: number[] = [];
	let carry = k;
	for (let i = num.length - 1; i >= 0 || carry > 0; i--) {
		const total = (num[i] ?? 0) + carry;
		result.push(total % 10);
		carry = Math.floor(total / 10);
	}
	return result.reverse();
};
