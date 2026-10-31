/**
 * 2151. Maximum Good People Based on Statements
 *
 * Good people only tell the truth; bad people may say anything.
 * `statements[i][j]` is 1 if `i` calls `j` good, 0 if bad, 2 if silent.
 * Returns the most people who can be good.
 *
 * With at most 15 people, try every set of good people, keeping those
 * whose members' statements all hold.
 *
 * @see https://leetcode.com/problems/maximum-good-people-based-on-statements/
 * @difficulty Hard
 * @timeComplexity O(2^n · n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumGoodPeopleBasedOnStatements([[2, 1, 2], [1, 2, 2], [2, 0, 2]]); // 2
 */
export const maximumGoodPeopleBasedOnStatements = (
	statements: readonly (readonly number[])[],
): number => {
	const n = statements.length;
	let best = 0;
	for (let good = 0; good < 1 << n; good++) {
		let consistent = true;
		let count = 0;
		for (let i = 0; i < n && consistent; i++) {
			if (!(good & (1 << i))) continue;
			count++;
			for (let j = 0; j < n && consistent; j++) {
				const said = statements[i]?.[j];
				if (said !== 2 && said !== (good >> j) % 2) consistent = false;
			}
		}
		if (consistent) best = Math.max(best, count);
	}
	return best;
};
