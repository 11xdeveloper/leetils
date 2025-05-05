/**
 * Write an algorithm to determine if a number n is happy.
 * A happy number is a number defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle.
 * - Those numbers for which this process ends in 1 are happy.
 *
 * @param n - The number to check
 * @returns true if n is a happy number, false otherwise
 *
 * @example
 * Input: n = 19
 * Output: true
 * Explanation:
 * 1² + 9² = 82
 * 8² + 2² = 68
 * 6² + 8² = 100
 * 1² + 0² + 0² = 1
 *
 * @example
 * Input: n = 2
 * Output: false
 * Explanation: It enters a cycle that never reaches 1
 *
 * @timeComplexity O(log n) - Number of digits decreases logarithmically
 * @spaceComplexity O(log n) - To store the sequence of numbers in the cycle
 */
export const isHappy = (n: number): boolean => {
	const previous: number[] = [];

	const recurse = (num: number): boolean => {
		if (previous.includes(num)) return false;
		previous.push(num);

		const sum = Array.from(num.toString().split(""), Number).reduce(
			(acc, x) => acc + x * x,
			0,
		);

		return sum === 1 ? true : recurse(sum);
	};

	return recurse(n);
};
