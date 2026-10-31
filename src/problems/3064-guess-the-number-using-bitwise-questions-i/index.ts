/**
 * 3064. Guess the Number Using Bitwise Questions I
 *
 * Find a hidden number `n` (1 ≤ n < 2³⁰) using `commonSetBits(num)`, which
 * returns how many bits `n` and `num` both have set. Pass in the API to get
 * back the solving function.
 *
 * Ask about each single bit in turn.
 *
 * @see https://leetcode.com/problems/guess-the-number-using-bitwise-questions-i/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * guessTheNumberUsingBitwiseQuestionsI((num) => popcount(31 & num))(); // 31
 */
export const guessTheNumberUsingBitwiseQuestionsI =
	(commonSetBits: (num: number) => number): (() => number) =>
	() => {
		let n = 0;
		for (let bit = 0; bit < 30; bit++)
			if (commonSetBits(1 << bit) === 1) n |= 1 << bit;
		return n;
	};
