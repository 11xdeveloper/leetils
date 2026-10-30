/**
 * 2149. Rearrange Array Elements by Sign
 *
 * Interleaves the equally many positive and negative numbers of `nums`,
 * starting with a positive one and keeping each sign's order.
 *
 * Place positives at even indices and negatives at odd ones.
 *
 * @see https://leetcode.com/problems/rearrange-array-elements-by-sign/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeArrayElementsBySign([3, 1, -2, -5, 2, -4]); // [3, -2, 1, -5, 2, -4]
 */
export const rearrangeArrayElementsBySign = (
	nums: readonly number[],
): number[] => {
	const result = new Array<number>(nums.length).fill(0);
	let [positive, negative] = [0, 1];
	for (const num of nums) {
		if (num > 0) {
			result[positive] = num;
			positive += 2;
		} else {
			result[negative] = num;
			negative += 2;
		}
	}
	return result;
};
