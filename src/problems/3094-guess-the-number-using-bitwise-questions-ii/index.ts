/**
 * 3094. Guess the Number Using Bitwise Questions II
 *
 * Find a hidden number `n` (0 ≤ n < 2³⁰) using `commonBits(num)`, which
 * returns how many bit positions `n` and `num` agree on and then replaces
 * `n` with `n XOR num`. Pass in the API to get back the solving function.
 *
 * Ask about each single bit twice, which flips it and flips it back. If the
 * bit is set, the first answer counts it as agreeing and the second doesn't,
 * so the answers drop by one; otherwise they rise by one.
 *
 * @see https://leetcode.com/problems/guess-the-number-using-bitwise-questions-ii/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * guessTheNumberUsingBitwiseQuestionsII(commonBits)(); // the hidden number
 */
export const guessTheNumberUsingBitwiseQuestionsII =
	(commonBits: (num: number) => number): (() => number) =>
	() => {
		let n = 0;
		for (let bit = 0; bit < 30; bit++) {
			const first = commonBits(1 << bit);
			const second = commonBits(1 << bit);
			if (first > second) n |= 1 << bit;
		}
		return n;
	};
