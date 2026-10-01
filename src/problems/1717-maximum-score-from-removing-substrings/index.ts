/**
 * 1717. Maximum Score From Removing Substrings
 *
 * Removing `ab` from `s` scores `x` and removing `ba` scores `y`. Returns
 * the largest total score.
 *
 * Greedily remove every copy of the more valuable pair (a stack handles
 * the removals that new adjacencies create), then every copy of the other.
 *
 * @see https://leetcode.com/problems/maximum-score-from-removing-substrings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumScoreFromRemovingSubstrings("cdbcbbaaabab", 4, 5); // 19
 */
export const maximumScoreFromRemovingSubstrings = (
	s: string,
	x: number,
	y: number,
): number => {
	const [first, second] = x >= y ? (["ab", x] as const) : (["ba", y] as const);
	const removeAll = (
		text: readonly string[],
		pair: string,
	): [rest: string[], removed: number] => {
		const stack: string[] = [];
		let removed = 0;
		for (const char of text) {
			if (stack.at(-1) === pair[0] && char === pair[1]) {
				stack.pop();
				removed++;
			} else {
				stack.push(char);
			}
		}
		return [stack, removed];
	};
	const [rest, firstRemoved] = removeAll([...s], first);
	const [, secondRemoved] = removeAll(rest, first === "ab" ? "ba" : "ab");
	return firstRemoved * second + secondRemoved * (first === "ab" ? y : x);
};
