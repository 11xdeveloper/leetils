/**
 * 2491. Divide Players Into Teams of Equal Skill
 *
 * Pairs the players into teams with equal total skill. Returns the sum of
 * each team's product of skills, or -1 if impossible.
 *
 * Sort and pair the weakest with the strongest.
 *
 * @see https://leetcode.com/problems/divide-players-into-teams-of-equal-skill/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * dividePlayersIntoTeamsOfEqualSkill([3, 2, 5, 1, 3, 4]); // 22
 */
export const dividePlayersIntoTeamsOfEqualSkill = (
	skill: readonly number[],
): number => {
	const sorted = skill.toSorted((a, b) => a - b);
	const target = (sorted[0] ?? 0) + (sorted.at(-1) ?? 0);
	let chemistry = 0;
	for (let [i, j] = [0, sorted.length - 1]; i < j; i++, j--) {
		const [a = 0, b = 0] = [sorted[i], sorted[j]];
		if (a + b !== target) return -1;
		chemistry += a * b;
	}
	return chemistry;
};
