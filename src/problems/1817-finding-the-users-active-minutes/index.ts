/**
 * 1817. Finding the Users Active Minutes
 *
 * A user's active minutes are the distinct minutes in which they acted.
 * Returns `answer[j − 1]` = the number of users with exactly `j` active
 * minutes, for `j` from 1 to `k`.
 *
 * A set of minutes per user, then a histogram of the set sizes.
 *
 * @see https://leetcode.com/problems/finding-the-users-active-minutes/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(n + k)
 *
 * @example
 * findingTheUsersActiveMinutes([[0, 5], [1, 2], [0, 2], [0, 5], [1, 3]], 5); // [0, 2, 0, 0, 0]
 */
export const findingTheUsersActiveMinutes = (
	logs: readonly (readonly number[])[],
	k: number,
): number[] => {
	const minutes = new Map<number, Set<number>>();
	for (const [user = 0, minute = 0] of logs)
		minutes.set(user, (minutes.get(user) ?? new Set()).add(minute));
	const answer = new Array<number>(k).fill(0);
	for (const active of minutes.values())
		answer[active.size - 1] = (answer[active.size - 1] ?? 0) + 1;
	return answer;
};
