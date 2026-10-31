/**
 * 3677. Count Binary Palindromic Numbers
 *
 * Counts the integers from 0 to `n` whose binary form (no leading zeros)
 * reads the same backwards.
 *
 * A palindrome is fixed by its first half, which starts with 1. Count all
 * shorter lengths outright; for n's length, count the halves below n's own
 * half, plus n's half mirrored if that's still at most n.
 *
 * @see https://leetcode.com/problems/count-binary-palindromic-numbers/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * countBinaryPalindromicNumbers(9); // 6
 */
export const countBinaryPalindromicNumbers = (n: number): number => {
	if (n === 0) return 1;
	const bits = n.toString(2);
	const length = bits.length;
	// 0, then every palindrome shorter than n.
	let count = 1;
	for (let l = 1; l < length; l++) count += 2 ** (Math.ceil(l / 2) - 1);
	const half = bits.slice(0, Math.ceil(length / 2));
	count += Number.parseInt(half, 2) - 2 ** (half.length - 1);
	const mirrored =
		half + [...half.slice(0, Math.floor(length / 2))].reverse().join("");
	if (BigInt(`0b${mirrored}`) <= BigInt(n)) count++;
	return count;
};
