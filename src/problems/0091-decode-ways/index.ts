/**
 * 91. Decode Ways
 *
 * Returns how many ways the digit string `s` can be decoded into letters,
 * where `"1"` to `"26"` stand for A to Z. `"06"` isn't a valid code, so a
 * leading zero makes a way invalid.
 *
 * Dynamic programming: the ways to decode the first `i` digits are the ways
 * to decode `i - 1` of them (if digit `i` is 1–9) plus the ways to decode
 * `i - 2` of them (if the last two digits are 10–26). Keeps just the last
 * two counts.
 *
 * @see https://leetcode.com/problems/decode-ways/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * decodeWays("226"); // 3: "BZ", "VF" and "BBF"
 */
export const decodeWays = (s: string): number => {
	let twoBack = 0;
	let oneBack = 1;

	for (let i = 0; i < s.length; i++) {
		let ways = s[i] === "0" ? 0 : oneBack;
		const pair = Number(s.slice(i - 1, i + 1));
		if (i > 0 && s[i - 1] !== "0" && pair <= 26) ways += twoBack;
		[twoBack, oneBack] = [oneBack, ways];
	}

	return oneBack;
};
