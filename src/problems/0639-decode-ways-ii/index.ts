/**
 * 639. Decode Ways II
 *
 * Letters are encoded as `"1"` to `"26"`, and `*` stands for any digit from
 * 1 to 9. Counts the ways to decode `s`, modulo 10^9 + 7.
 *
 * DP like Decode Ways, keeping the counts for the last two prefixes. Each
 * character adds the ways it can be a letter alone (times the count before
 * it), and the ways it and the character before can form a letter from 10
 * to 26 together (times the count before those two), where `*` multiplies
 * the choices.
 *
 * @see https://leetcode.com/problems/decode-ways-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * decodeWaysII("1*"); // 18
 */
export const decodeWaysII = (s: string): number => {
	const MOD = 1_000_000_007;

	const single = (char: string): number => {
		if (char === "*") return 9;
		return char === "0" ? 0 : 1;
	};
	const pair = (first: string, second: string): number => {
		if (first === "*" && second === "*") return 15; // 11–19 and 21–26
		if (first === "*") return Number(second) <= 6 ? 2 : 1; // 1x and, for x ≤ 6, 2x
		if (second === "*") {
			if (first === "1") return 9;
			return first === "2" ? 6 : 0;
		}
		const value = Number(first + second);
		return first !== "0" && value <= 26 ? 1 : 0;
	};

	let beforePrevious = 1;
	let previous = single(s.charAt(0));
	for (let i = 1; i < s.length; i++) {
		const current =
			(single(s.charAt(i)) * previous +
				pair(s.charAt(i - 1), s.charAt(i)) * beforePrevious) %
			MOD;
		[beforePrevious, previous] = [previous, current];
	}

	return previous;
};
