/**
 * 1541. Minimum Insertions to Balance a Parentheses String
 *
 * Here each `(` must be closed by `))`. Returns the fewest parentheses to
 * insert so `s` is balanced.
 *
 * Scans left to right counting how many `)` are owed. A `)` that isn't
 * followed by another needs one inserted; a `))` with nothing open needs a
 * `(` inserted. Whatever is still owed at the end is inserted too.
 *
 * @see https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumInsertionsToBalanceAParenthesesString("))())("); // 3
 */
export const minimumInsertionsToBalanceAParenthesesString = (
	s: string,
): number => {
	let [open, inserted] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "(") {
			open++;
			continue;
		}
		if (s[i + 1] === ")") i++;
		else inserted++;
		if (open > 0) open--;
		else inserted++;
	}
	return inserted + 2 * open;
};
