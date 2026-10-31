/**
 * 3576. Transform Array to All Equal Elements
 *
 * `nums` holds only 1 and -1; one operation negates two neighbours.
 * Whether at most `k` operations can make every element equal.
 *
 * For each target sign, sweep left to right and flip at every element that
 * doesn't match yet, which is forced; it works if the last element ends up
 * matching too.
 *
 * @see https://leetcode.com/problems/transform-array-to-all-equal-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * transformArrayToAllEqualElements([1, -1, 1, -1, 1], 3); // true
 */
export const transformArrayToAllEqualElements = (
	nums: readonly number[],
	k: number,
): boolean =>
	[1, -1].some((target) => {
		const values = [...nums];
		let operations = 0;
		for (let i = 0; i + 1 < values.length; i++)
			if (values[i] !== target) {
				values[i] = target;
				values[i + 1] = -(values[i + 1] ?? 0);
				operations++;
			}
		return values.at(-1) === target && operations <= k;
	});
