/**
 * 3821. Find Nth Smallest Integer With K One Bits
 *
 * The n-th smallest positive integer with exactly `k` set bits (it's
 * below 2⁵⁰).
 *
 * Decide bits from the top: with b lower positions left, C(b, ones left)
 * numbers leave this bit clear; if n is beyond them, set it and skip
 * past them.
 *
 * @see https://leetcode.com/problems/find-nth-smallest-integer-with-k-one-bits/
 * @difficulty Hard
 * @timeComplexity O(50²)
 * @spaceComplexity O(50²)
 *
 * @example
 * findNthSmallestIntegerWithKOneBits(4, 2); // 9
 */
export const findNthSmallestIntegerWithKOneBits = (
	n: number,
	k: number,
): number => {
	const choose: number[][] = Array.from({ length: 51 }, () =>
		new Array<number>(51).fill(0),
	);
	for (let i = 0; i <= 50; i++) {
		(choose[i] as number[])[0] = 1;
		for (let j = 1; j <= i; j++)
			(choose[i] as number[])[j] =
				(choose[i - 1]?.[j - 1] ?? 0) + (choose[i - 1]?.[j] ?? 0);
	}
	let result = 0;
	for (let bit = 49; bit >= 0 && k > 0; bit--) {
		const clear = choose[bit]?.[k] ?? 0;
		if (n > clear) {
			result += 2 ** bit;
			n -= clear;
			k--;
		}
	}
	return result;
};
