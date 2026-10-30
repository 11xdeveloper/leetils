/**
 * 2748. Number of Beautiful Pairs
 *
 * A pair `i < j` is beautiful if the first digit of `nums[i]` and the
 * last digit of `nums[j]` are coprime. Returns the number of beautiful
 * pairs.
 *
 * Count the first digits seen so far, and for each number add those
 * coprime with its last digit.
 *
 * @see https://leetcode.com/problems/number-of-beautiful-pairs/
 * @difficulty Easy
 * @timeComplexity O(10 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfBeautifulPairs([2, 5, 1, 4]); // 5
 */
export const numberOfBeautifulPairs = (nums: readonly number[]): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const firstDigits = Array.from({ length: 10 }, () => 0);
	let pairs = 0;
	for (const num of nums) {
		const last = num % 10;
		for (let d = 1; d <= 9; d++)
			if (gcd(d, last) === 1) pairs += firstDigits[d] ?? 0;
		const first = Number(String(num).charAt(0));
		firstDigits[first] = (firstDigits[first] ?? 0) + 1;
	}
	return pairs;
};
