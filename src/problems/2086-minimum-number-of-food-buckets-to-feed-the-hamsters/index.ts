/**
 * 2086. Minimum Number of Food Buckets to Feed the Hamsters
 *
 * `hamsters` has hamsters "H" and empty spots "."; a hamster is fed by a
 * bucket in an adjacent spot. Returns the fewest buckets to feed them
 * all, or -1 if impossible.
 *
 * Greedily, an unfed hamster's bucket goes to its right when possible,
 * where it may also feed the next hamster, and to its left otherwise.
 *
 * @see https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfFoodBucketsToFeedTheHamsters("H..H"); // 2
 */
export const minimumNumberOfFoodBucketsToFeedTheHamsters = (
	hamsters: string,
): number => {
	const bucket = new Uint8Array(hamsters.length);
	let buckets = 0;
	for (let i = 0; i < hamsters.length; i++) {
		if (hamsters[i] !== "H" || bucket[i - 1]) continue;
		if (hamsters[i + 1] === ".") bucket[i + 1] = 1;
		else if (hamsters[i - 1] === ".") bucket[i - 1] = 1;
		else return -1;
		buckets++;
	}
	return buckets;
};
