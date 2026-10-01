/**
 * 1583. Count Unhappy Friends
 *
 * Friends are paired up. Friend `x` (paired with `y`) is unhappy if some
 * `u` (paired with `v`) is preferred by `x` over `y` and prefers `x` over
 * `v`. Returns how many friends are unhappy.
 *
 * Precomputes each friend's ranking of the others, then checks, for each
 * `x`, the friends it likes better than its partner.
 *
 * @see https://leetcode.com/problems/count-unhappy-friends/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * countUnhappyFriends(4, [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], [[0, 1], [2, 3]]); // 2
 */
export const countUnhappyFriends = (
	n: number,
	preferences: readonly (readonly number[])[],
	pairs: readonly (readonly number[])[],
): number => {
	const rank = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	preferences.forEach((list, x) => {
		list.forEach((friend, i) => {
			const row = rank[x];
			if (row) row[friend] = i;
		});
	});
	const partner = new Array<number>(n).fill(0);
	for (const [a = 0, b = 0] of pairs) [partner[a], partner[b]] = [b, a];
	let unhappy = 0;
	for (let x = 0; x < n; x++) {
		const y = partner[x] ?? 0;
		const better = (preferences[x] ?? []).slice(0, rank[x]?.[y] ?? 0);
		if (
			better.some(
				(u) => (rank[u]?.[x] ?? 0) < (rank[u]?.[partner[u] ?? 0] ?? 0),
			)
		)
			unhappy++;
	}
	return unhappy;
};
