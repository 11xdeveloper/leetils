/**
 * 3591. Check if Any Element Has Prime Frequency
 *
 * Whether some value appears in `nums` a prime number of times.
 *
 * @see https://leetcode.com/problems/check-if-any-element-has-prime-frequency/
 * @difficulty Easy
 * @timeComplexity O(n√n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfAnyElementHasPrimeFrequency([1, 2, 3, 4, 5, 4]); // true
 */
export const checkIfAnyElementHasPrimeFrequency = (
	nums: readonly number[],
): boolean => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const isPrime = (x: number): boolean => {
		if (x < 2) return false;
		for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
		return true;
	};
	return [...counts.values()].some(isPrime);
};
