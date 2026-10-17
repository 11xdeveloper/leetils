/**
 * 2023. Number of Pairs of Strings With Concatenation Equal to Target
 *
 * Counts the index pairs `i ≠ j` with `nums[i] + nums[j] === target`.
 *
 * Count the strings. Every string that starts `target` pairs with each
 * copy of the rest of `target`, other than itself.
 *
 * @see https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target/
 * @difficulty Medium
 * @timeComplexity O(n · t)
 * @spaceComplexity O(n · t)
 *
 * @example
 * numberOfPairsOfStringsWithConcatenationEqualToTarget(["777", "7", "77", "77"], "7777"); // 4
 */
export const numberOfPairsOfStringsWithConcatenationEqualToTarget = (
	nums: readonly string[],
	target: string,
): number => {
	const counts = new Map<string, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let pairs = 0;
	for (const num of nums) {
		if (!target.startsWith(num)) continue;
		const rest = target.slice(num.length);
		pairs += (counts.get(rest) ?? 0) - (rest === num ? 1 : 0);
	}
	return pairs;
};
