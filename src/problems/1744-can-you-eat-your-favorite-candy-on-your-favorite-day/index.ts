/**
 * 1744. Can You Eat Your Favorite Candy on Your Favorite Day?
 *
 * Candies are eaten in type order, at least one a day. For each query
 * `[type, day, cap]`, returns whether a candy of `type` can be eaten on
 * `day` (from 0) without ever eating more than `cap` in a day.
 *
 * By the end of `day`, between `day + 1` (one a day) and
 * `(day + 1) · cap` candies have been eaten. The query works if that range
 * reaches past the earlier types without finishing this type before the
 * day starts.
 *
 * @see https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * canYouEatYourFavoriteCandyOnYourFavoriteDay([7, 4, 5, 3, 8], [[0, 2, 2], [4, 2, 4], [2, 13, 1000000000]]); // [true, false, true]
 */
export const canYouEatYourFavoriteCandyOnYourFavoriteDay = (
	candiesCount: readonly number[],
	queries: readonly (readonly number[])[],
): boolean[] => {
	const before = [0];
	for (const count of candiesCount) before.push((before.at(-1) ?? 0) + count);
	return queries.map(([type = 0, day = 0, cap = 0]) => {
		const [fewest, most] = [day + 1, (day + 1) * cap];
		return fewest <= (before[type + 1] ?? 0) && most > (before[type] ?? 0);
	});
};
