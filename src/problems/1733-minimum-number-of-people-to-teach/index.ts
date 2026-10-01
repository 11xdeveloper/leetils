/**
 * 1733. Minimum Number of People to Teach
 *
 * Users know some of `n` languages, and friends can talk if they share
 * one. Teaching a single language to some users, returns the fewest users
 * to teach so every pair of friends can talk.
 *
 * Only users in a friendship that can't already talk need help. Choose the
 * language most of them already know, and teach it to the rest.
 *
 * @see https://leetcode.com/problems/minimum-number-of-people-to-teach/
 * @difficulty Medium
 * @timeComplexity O(f · L + m · L) for f friendships, m users and L languages per user
 * @spaceComplexity O(m · L)
 *
 * @example
 * minimumNumberOfPeopleToTeach(2, [[1], [2], [1, 2]], [[1, 2], [1, 3], [2, 3]]); // 1
 */
export const minimumNumberOfPeopleToTeach = (
	n: number,
	languages: readonly (readonly number[])[],
	friendships: readonly (readonly number[])[],
): number => {
	const known = languages.map((list) => new Set(list));
	const needHelp = new Set<number>();
	for (const [u = 1, v = 1] of friendships) {
		const [a, b] = [
			known[u - 1] ?? new Set<number>(),
			known[v - 1] ?? new Set<number>(),
		];
		if ([...a].some((language) => b.has(language))) continue;
		needHelp.add(u - 1);
		needHelp.add(v - 1);
	}
	const speakers = new Array<number>(n + 1).fill(0);
	for (const user of needHelp) {
		for (const language of known[user] ?? [])
			speakers[language] = (speakers[language] ?? 0) + 1;
	}
	return needHelp.size - Math.max(...speakers);
};
