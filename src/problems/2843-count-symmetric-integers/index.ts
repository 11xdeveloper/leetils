/**
 * 2843. Count Symmetric Integers
 *
 * An integer with `2n` digits is symmetric if its first `n` digits sum to
 * the same as its last `n`. Returns how many lie in `[low, high]`.
 *
 * Check each integer.
 *
 * @see https://leetcode.com/problems/count-symmetric-integers/
 * @difficulty Easy
 * @timeComplexity O((high - low) · log high)
 * @spaceComplexity O(log high)
 *
 * @example
 * countSymmetricIntegers(1200, 1230); // 4
 */
export const countSymmetricIntegers = (low: number, high: number): number => {
	let count = 0;
	for (let x = low; x <= high; x++) {
		const digits = [...String(x)].map(Number);
		if (digits.length % 2 === 1) continue;
		const half = digits.length / 2;
		let balance = 0;
		for (const [i, d] of digits.entries()) balance += i < half ? d : -d;
		if (balance === 0) count++;
	}
	return count;
};
