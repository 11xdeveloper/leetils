/**
 * 556. Next Greater Element III
 *
 * Returns the smallest number greater than `n` that uses exactly the same
 * digits, or -1 if there's none or it doesn't fit in a signed 32-bit
 * integer.
 *
 * Finds the next permutation of the digits: the rightmost digit smaller
 * than the one after it is swapped with the smallest larger digit to its
 * right, then the digits after it are reversed into ascending order.
 *
 * @see https://leetcode.com/problems/next-greater-element-iii/
 * @difficulty Medium
 * @timeComplexity O(d) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * nextGreaterElementIII(12); // 21
 */
export const nextGreaterElementIII = (n: number): number => {
	const digits = [...String(n)];
	let pivot = digits.length - 2;
	while (pivot >= 0 && (digits[pivot] ?? "") >= (digits[pivot + 1] ?? ""))
		pivot--;
	if (pivot < 0) return -1;

	let swap = digits.length - 1;
	while ((digits[swap] ?? "") <= (digits[pivot] ?? "")) swap--;
	[digits[pivot], digits[swap]] = [digits[swap] ?? "", digits[pivot] ?? ""];
	const next = Number(
		[...digits.slice(0, pivot + 1), ...digits.slice(pivot + 1).reverse()].join(
			"",
		),
	);

	return next > 2 ** 31 - 1 ? -1 : next;
};
