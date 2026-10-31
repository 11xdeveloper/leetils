/**
 * 3079. Find the Sum of Encrypted Integers
 *
 * Encrypting a number replaces every digit with its largest digit. Returns
 * the sum of the encrypted numbers.
 *
 * For each number, write its largest digit as many times as it has digits.
 *
 * @see https://leetcode.com/problems/find-the-sum-of-encrypted-integers/
 * @difficulty Easy
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheSumOfEncryptedIntegers([10, 21, 31]); // 66
 */
export const findTheSumOfEncryptedIntegers = (
	nums: readonly number[],
): number => {
	let sum = 0;
	for (const num of nums) {
		let largest = 0;
		let ones = 0;
		for (let rest = num; rest > 0; rest = Math.floor(rest / 10)) {
			largest = Math.max(largest, rest % 10);
			ones = ones * 10 + 1;
		}
		sum += largest * ones;
	}
	return sum;
};
