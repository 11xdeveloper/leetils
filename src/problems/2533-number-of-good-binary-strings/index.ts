const MOD = 1_000_000_007;

/**
 * 2533. Number of Good Binary Strings
 *
 * A binary string is good if its length is in `[minLength, maxLength]`,
 * every block of 1s has a length divisible by `oneGroup`, and every block
 * of 0s one divisible by `zeroGroup`. Returns the number of good strings,
 * modulo 1e9 + 7.
 *
 * A good string is a sequence of `oneGroup`-long runs of 1s and
 * `zeroGroup`-long runs of 0s, so count those sequences by length.
 *
 * @see https://leetcode.com/problems/number-of-good-binary-strings/
 * @difficulty Medium
 * @timeComplexity O(maxLength)
 * @spaceComplexity O(maxLength)
 *
 * @example
 * numberOfGoodBinaryStrings(2, 3, 1, 2); // 5
 */
export const numberOfGoodBinaryStrings = (
	minLength: number,
	maxLength: number,
	oneGroup: number,
	zeroGroup: number,
): number => {
	const ways = [1];
	let good = 0;
	for (let length = 1; length <= maxLength; length++) {
		const count =
			((length >= oneGroup ? (ways[length - oneGroup] ?? 0) : 0) +
				(length >= zeroGroup ? (ways[length - zeroGroup] ?? 0) : 0)) %
			MOD;
		ways.push(count);
		if (length >= minLength) good = (good + count) % MOD;
	}
	return good;
};
