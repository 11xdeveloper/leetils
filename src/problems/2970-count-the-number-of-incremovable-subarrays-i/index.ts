/**
 * 2970. Count the Number of Incremovable Subarrays I
 *
 * A non-empty subarray is incremovable if deleting it leaves `nums`
 * strictly increasing (an empty array counts). Returns how many there
 * are.
 *
 * Try removing every subarray.
 *
 * @see https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i/
 * @difficulty Easy
 * @timeComplexity O(n³)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfIncremovableSubarraysI([6, 5, 7, 8]); // 7
 */
export const countTheNumberOfIncremovableSubarraysI = (
	nums: readonly number[],
): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const rest = [...nums.slice(0, i), ...nums.slice(j + 1)];
			if (rest.every((x, t) => t === 0 || x > (rest[t - 1] ?? 0))) count++;
		}
	return count;
};
