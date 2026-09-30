/**
 * 1103. Distribute Candies to People
 *
 * Gives 1, 2, 3, … candies to the people in a row, going round again and
 * again, until the candies run out (the last person gets whatever is left).
 * Returns how many candies each of the `num_people` people ends up with.
 *
 * Simulates the gifts; the kth gift is k candies, so there are only
 * O(√candies) of them.
 *
 * @see https://leetcode.com/problems/distribute-candies-to-people/
 * @difficulty Easy
 * @timeComplexity O(√candies + n)
 * @spaceComplexity O(n)
 *
 * @example
 * distributeCandiesToPeople(10, 3); // [5, 2, 3]
 */
export const distributeCandiesToPeople = (
	candies: number,
	num_people: number,
): number[] => {
	const result = new Array<number>(num_people).fill(0);
	for (let gift = 1; candies > 0; gift++) {
		const given = Math.min(gift, candies);
		const person = (gift - 1) % num_people;
		result[person] = (result[person] ?? 0) + given;
		candies -= given;
	}
	return result;
};
