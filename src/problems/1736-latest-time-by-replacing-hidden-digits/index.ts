/**
 * 1736. Latest Time by Replacing Hidden Digits
 *
 * Replaces each `?` in the `hh:mm` string `time` to give the latest valid
 * time.
 *
 * Choose each hidden digit as large as the digits around it allow.
 *
 * @see https://leetcode.com/problems/latest-time-by-replacing-hidden-digits/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * latestTimeByReplacingHiddenDigits("2?:?0"); // "23:50"
 */
export const latestTimeByReplacingHiddenDigits = (time: string): string => {
	const [h1 = "?", h2 = "?", , m1 = "?", m2 = "?"] = time;
	const first = h1 === "?" ? (h2 === "?" || h2 <= "3" ? "2" : "1") : h1;
	const second = h2 === "?" ? (first === "2" ? "3" : "9") : h2;
	return `${first}${second}:${m1 === "?" ? "5" : m1}${m2 === "?" ? "9" : m2}`;
};
