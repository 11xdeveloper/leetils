/**
 * 3258. Count Substrings That Satisfy K-Constraint I
 *
 * Count the substrings of the binary string `s` with at most `k` zeros or
 * at most `k` ones.
 *
 * Slide a window, shrinking from the left while it has more than `k` of
 * both; every start in the window then works for the current end.
 *
 * @see https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsThatSatisfyKConstraintI("10101", 1); // 12
 */
export const countSubstringsThatSatisfyKConstraintI = (
	s: string,
	k: number,
): number => {
	let zeros = 0;
	let ones = 0;
	let total = 0;
	for (let left = 0, right = 0; right < s.length; right++) {
		if (s[right] === "0") zeros++;
		else ones++;
		while (zeros > k && ones > k)
			if (s[left++] === "0") zeros--;
			else ones--;
		total += right - left + 1;
	}
	return total;
};
