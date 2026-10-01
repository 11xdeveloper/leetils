/**
 * 1208. Get Equal Substrings Within Budget
 *
 * Changing `s[i]` to `t[i]` costs the difference of their character codes.
 * Returns the longest substring of `s` that can be changed to match `t`
 * for at most `maxCost`.
 *
 * A sliding window over the costs, shrinking from the left while it's over
 * budget.
 *
 * @see https://leetcode.com/problems/get-equal-substrings-within-budget/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * getEqualSubstringsWithinBudget("abcd", "bcdf", 3); // 3
 */
export const getEqualSubstringsWithinBudget = (
	s: string,
	t: string,
	maxCost: number,
): number => {
	const cost = (i: number) => Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
	let [start, total, longest] = [0, 0, 0];
	for (let end = 0; end < s.length; end++) {
		total += cost(end);
		while (total > maxCost) total -= cost(start++);
		longest = Math.max(longest, end - start + 1);
	}
	return longest;
};
