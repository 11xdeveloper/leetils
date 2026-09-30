/**
 * 942. DI String Match
 *
 * Returns a permutation of 0 to `n` (`n = s.length`) where each `"I"` in `s`
 * means the next number is larger and each `"D"` that it's smaller. Any
 * valid permutation is accepted.
 *
 * Greedy: an `"I"` takes the smallest number left (everything after is
 * larger), a `"D"` the largest; the last position takes what remains.
 *
 * @see https://leetcode.com/problems/di-string-match/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * diStringMatch("IDID"); // [0, 4, 1, 3, 2]
 */
export const diStringMatch = (s: string): number[] => {
	let low = 0;
	let high = s.length;
	const result = [...s].map((letter) => (letter === "I" ? low++ : high--));
	result.push(low);
	return result;
};
