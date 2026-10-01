/**
 * 1869. Longer Contiguous Segments of Ones than Zeros
 *
 * Returns whether the longest run of ones in the binary string `s` is
 * strictly longer than its longest run of zeros.
 *
 * One pass tracking the current run and the longest of each kind.
 *
 * @see https://leetcode.com/problems/longer-contiguous-segments-of-ones-than-zeros/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longerContiguousSegmentsOfOnesThanZeros("1101"); // true
 */
export const longerContiguousSegmentsOfOnesThanZeros = (s: string): boolean => {
	const longest = { "0": 0, "1": 0 };
	let run = 0;
	for (let i = 0; i < s.length; i++) {
		run = s[i] === s[i - 1] ? run + 1 : 1;
		const char = s[i] === "1" ? "1" : "0";
		longest[char] = Math.max(longest[char], run);
	}
	return longest["1"] > longest["0"];
};
