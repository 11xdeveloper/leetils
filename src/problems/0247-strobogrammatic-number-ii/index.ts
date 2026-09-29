const PAIRS = [
	["0", "0"],
	["1", "1"],
	["6", "9"],
	["8", "8"],
	["9", "6"],
] as const;

/**
 * 247. Strobogrammatic Number II
 *
 * Returns every `n`-digit number that reads the same when rotated 180
 * degrees (turned upside down), with no leading zeros except for 0 itself.
 *
 * Builds the numbers from the middle outwards: starting from the empty
 * string (or a single 0, 1 or 8 for odd lengths), wraps each in every pair
 * of digits that rotate into each other. The outermost pair can't be 0s.
 *
 * @see https://leetcode.com/problems/strobogrammatic-number-ii/
 * @difficulty Medium
 * @timeComplexity O(n * 5^(n/2))
 * @spaceComplexity O(n * 5^(n/2)) for the returned numbers
 *
 * @example
 * strobogrammaticNumberII(2); // ["11", "69", "88", "96"]
 */
export const strobogrammaticNumberII = (n: number): string[] => {
	let numbers = n % 2 === 1 ? ["0", "1", "8"] : [""];

	for (let length = (n % 2) + 2; length <= n; length += 2) {
		const outermost = length === n;
		numbers = numbers.flatMap((middle) =>
			PAIRS.filter(([left]) => !outermost || left !== "0").map(
				([left, right]) => left + middle + right,
			),
		);
	}

	return numbers;
};
