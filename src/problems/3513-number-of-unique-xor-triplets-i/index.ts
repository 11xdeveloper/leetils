/**
 * 3513. Number of Unique XOR Triplets I
 *
 * For a permutation of 1 to n, how many distinct values `nums[i] ^ nums[j] ^
 * nums[k]` take over i ≤ j ≤ k.
 *
 * With one or two numbers that's just them. From three on, every value
 * below the next power of two above n can be made.
 *
 * @see https://leetcode.com/problems/number-of-unique-xor-triplets-i/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfUniqueXorTripletsI([3, 1, 2]); // 4
 */
export const numberOfUniqueXorTripletsI = (nums: readonly number[]): number => {
	const n = nums.length;
	if (n <= 2) return n;
	let power = 1;
	while (power <= n) power *= 2;
	return power;
};
