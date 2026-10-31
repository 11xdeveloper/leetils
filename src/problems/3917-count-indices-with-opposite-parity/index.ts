/**
 * 3917. Count Indices With Opposite Parity
 *
 * For each index, counts the later elements of the opposite parity.
 *
 * @see https://leetcode.com/problems/count-indices-with-opposite-parity/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countIndicesWithOppositeParity([1, 2, 3, 4]); // [2, 1, 1, 0]
 */
export const countIndicesWithOppositeParity = (
	nums: readonly number[],
): number[] => {
	const later = [0, 0];
	const answer = new Array<number>(nums.length);
	for (let i = nums.length - 1; i >= 0; i--) {
		const parity = (nums[i] ?? 0) % 2;
		answer[i] = later[1 - parity] ?? 0;
		later[parity] = (later[parity] ?? 0) + 1;
	}
	return answer;
};
