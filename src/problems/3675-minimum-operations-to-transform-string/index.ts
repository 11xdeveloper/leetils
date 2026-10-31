/**
 * 3675. Minimum Operations to Transform String
 *
 * One operation advances every copy of one chosen letter to the next
 * letter (z wraps to a). Returns the fewest operations turning `s` into
 * all a's.
 *
 * Sweeping letters from b to z, each letter's group merges into the next,
 * so the cost is the distance to a from the earliest letter present.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-transform-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToTransformString("yz"); // 2
 */
export const minimumOperationsToTransformString = (s: string): number => {
	let most = 0;
	for (const c of s) most = Math.max(most, (26 - (c.charCodeAt(0) - 97)) % 26);
	return most;
};
