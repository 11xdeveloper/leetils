/**
 * 1366. Rank Teams by Votes
 *
 * Each vote ranks every team. Teams are ordered by their number of
 * first-place votes, ties broken by second-place votes and so on, and
 * finally alphabetically. Returns the teams in that order.
 *
 * Counts each team's votes at each position, then sorts by those counts.
 *
 * @see https://leetcode.com/problems/rank-teams-by-votes/
 * @difficulty Medium
 * @timeComplexity O(v · t + t^2 log t) for v votes over t teams
 * @spaceComplexity O(t^2)
 *
 * @example
 * rankTeamsByVotes(["ABC", "ACB", "ABC", "ACB", "ACB"]); // "ACB"
 */
export const rankTeamsByVotes = (votes: readonly string[]): string => {
	const teams = [...(votes[0] ?? "")];
	const counts = new Map(
		teams.map((team) => [team, new Array<number>(teams.length).fill(0)]),
	);
	for (const vote of votes) {
		[...vote].forEach((team, position) => {
			const row = counts.get(team);
			if (row) row[position] = (row[position] ?? 0) + 1;
		});
	}
	return teams
		.sort((a, b) => {
			const [rowA = [], rowB = []] = [counts.get(a), counts.get(b)];
			for (let position = 0; position < teams.length; position++) {
				const difference = (rowB[position] ?? 0) - (rowA[position] ?? 0);
				if (difference !== 0) return difference;
			}
			return a < b ? -1 : 1;
		})
		.join("");
};
