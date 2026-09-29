const sumOfSquaredDigits = (n: number): number => {
	let sum = 0;
	for (let rest = n; rest > 0; rest = Math.floor(rest / 10)) {
		const digit = rest % 10;
		sum += digit * digit;
	}
	return sum;
};

/**
 * 202. Happy Number
 *
 * Returns whether `n` is happy: repeatedly replacing it with the sum of the
 * squares of its digits eventually reaches 1, rather than looping forever in
 * a cycle that doesn't include 1.
 *
 * Uses Floyd's cycle detection. A slow pointer takes one step at a time and a
 * fast pointer takes two, so they meet if there is a cycle, without storing
 * the numbers seen.
 *
 * @see https://leetcode.com/problems/happy-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * happyNumber(19); // true: 1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1
 * happyNumber(2); // false
 */
export const happyNumber = (n: number): boolean => {
	let slow = n;
	let fast = sumOfSquaredDigits(n);

	while (fast !== 1 && slow !== fast) {
		slow = sumOfSquaredDigits(slow);
		fast = sumOfSquaredDigits(sumOfSquaredDigits(fast));
	}

	return fast === 1;
};
