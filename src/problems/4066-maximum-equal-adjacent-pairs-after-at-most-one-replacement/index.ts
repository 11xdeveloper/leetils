/**
 * 4066. Maximum Equal Adjacent Pairs After at Most One Replacement
 *
 * Replace every x in `nums` with some y, at most once. Returns the most
 * equal neighbouring pairs possible.
 *
 * Replacing x by y keeps every equal pair and newly joins exactly the
 * neighbouring pairs made of x and y, so add the most common pair of
 * distinct neighbouring values.
 *
 * @see https://leetcode.com/problems/maximum-equal-adjacent-pairs-after-at-most-one-replacement/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumEqualAdjacentPairsAfterAtMostOneReplacement([1, 2, 1, 2, 1]); // 4
 */
export const maximumEqualAdjacentPairsAfterAtMostOneReplacement = (
	nums: readonly number[],
): number => {
	let equal = 0;
	const pairs = new Map<string, number>();
	for (let i = 1; i < nums.length; i++) {
		const [a = 0, b = 0] = [nums[i - 1], nums[i]];
		if (a === b) {
			equal++;
			continue;
		}
		const key = a < b ? `${a},${b}` : `${b},${a}`;
		pairs.set(key, (pairs.get(key) ?? 0) + 1);
	}
	return equal + Math.max(0, ...pairs.values());
};
