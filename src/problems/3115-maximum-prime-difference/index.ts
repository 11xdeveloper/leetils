const isPrime = (num: number): boolean => {
	if (num < 2) return false;
	for (let d = 2; d * d <= num; d++) if (num % d === 0) return false;
	return true;
};

/**
 * 3115. Maximum Prime Difference
 *
 * The largest distance between the indices of two (not necessarily
 * different) primes in `nums`.
 *
 * Subtract the first prime's index from the last's.
 *
 * @see https://leetcode.com/problems/maximum-prime-difference/
 * @difficulty Medium
 * @timeComplexity O(n √max)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumPrimeDifference([4, 2, 9, 5, 3]); // 3
 */
export const maximumPrimeDifference = (nums: readonly number[]): number =>
	nums.findLastIndex(isPrime) - nums.findIndex(isPrime);
