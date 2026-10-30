/**
 * 2436. Minimum Split Into Subarrays With GCD Greater Than One
 *
 * Splits `nums` into the fewest subarrays whose GCDs all exceed 1.
 *
 * Greedily extend each subarray until its GCD would drop to 1.
 *
 * @see https://leetcode.com/problems/minimum-split-into-subarrays-with-gcd-greater-than-one/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSplitIntoSubarraysWithGcdGreaterThanOne([12, 6, 3, 14, 8]); // 2
 */
export const minimumSplitIntoSubarraysWithGcdGreaterThanOne = (
	nums: readonly number[],
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	let [parts, current] = [1, 0];
	for (const num of nums) {
		current = gcd(current, num);
		if (current === 1) [parts, current] = [parts + 1, num];
	}
	return parts;
};
