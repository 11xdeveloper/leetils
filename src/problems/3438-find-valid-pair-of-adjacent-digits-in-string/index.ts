/**
 * 3438. Find Valid Pair of Adjacent Digits in String
 *
 * The first pair of neighbouring different digits in `s` where each digit
 * appears in `s` exactly as many times as its value, or `""`.
 *
 * Count the digits, then scan the pairs.
 *
 * @see https://leetcode.com/problems/find-valid-pair-of-adjacent-digits-in-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findValidPairOfAdjacentDigitsInString("2523533"); // "23"
 */
export const findValidPairOfAdjacentDigitsInString = (s: string): string => {
	const counts = new Array<number>(10).fill(0);
	for (const digit of s)
		counts[Number(digit)] = (counts[Number(digit)] ?? 0) + 1;
	for (let i = 1; i < s.length; i++) {
		const [a, b] = [Number(s[i - 1]), Number(s[i])];
		if (a !== b && counts[a] === a && counts[b] === b)
			return s.slice(i - 1, i + 1);
	}
	return "";
};
