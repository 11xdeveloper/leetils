/**
 * 760. Find Anagram Mappings
 *
 * `nums2` is a rearrangement of `nums1`. Returns an array `mapping` where
 * `nums2[mapping[i]] === nums1[i]` and every index of `nums2` is used once.
 *
 * Lists the indices of each value in `nums2`, then hands them out as the
 * values appear in `nums1`.
 *
 * @see https://leetcode.com/problems/find-anagram-mappings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findAnagramMappings([12, 28, 46, 32, 50], [50, 12, 32, 46, 28]); // [1, 4, 3, 2, 0]
 */
export const findAnagramMappings = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const indices = new Map<number, number[]>();
	for (const [i, num] of nums2.entries()) {
		const list = indices.get(num);
		if (list) list.push(i);
		else indices.set(num, [i]);
	}
	return nums1.map((num) => indices.get(num)?.pop() ?? -1);
};
