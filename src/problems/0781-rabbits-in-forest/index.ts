/**
 * 781. Rabbits in Forest
 *
 * Each answer says how many other rabbits share the answering rabbit's
 * colour. Returns the fewest rabbits the forest could have.
 *
 * A rabbit answering `x` is in a colour group of `x + 1`. Rabbits giving the
 * same answer can share groups, `x + 1` to a group, so `c` of them need
 * `⌈c / (x + 1)⌉` groups.
 *
 * @see https://leetcode.com/problems/rabbits-in-forest/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rabbitsInForest([1, 1, 2]); // 5
 */
export const rabbitsInForest = (answers: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const answer of answers)
		counts.set(answer, (counts.get(answer) ?? 0) + 1);
	let rabbits = 0;
	for (const [answer, count] of counts)
		rabbits += Math.ceil(count / (answer + 1)) * (answer + 1);
	return rabbits;
};
