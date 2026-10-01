/**
 * 1630. Arithmetic Subarrays
 *
 * For each range `[l[i], r[i]]` of `nums`, returns whether its elements can
 * be rearranged into an arithmetic sequence.
 *
 * An arithmetic arrangement runs from the minimum to the maximum in equal
 * steps, so the step is fixed; check that every element sits on a distinct
 * step.
 *
 * @see https://leetcode.com/problems/arithmetic-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n)
 *
 * @example
 * arithmeticSubarrays([4, 6, 5, 9, 3, 7], [0, 0, 2], [2, 3, 5]); // [true, false, true]
 */
export const arithmeticSubarrays = (
	nums: readonly number[],
	l: readonly number[],
	r: readonly number[],
): boolean[] =>
	l.map((left, i) => {
		const values = nums.slice(left, (r[i] ?? 0) + 1);
		const [low, high] = [Math.min(...values), Math.max(...values)];
		const gaps = values.length - 1;
		if (high === low) return true;
		if ((high - low) % gaps !== 0) return false;
		const step = (high - low) / gaps;
		const seen = new Set<number>();
		for (const value of values) {
			if ((value - low) % step !== 0 || seen.has(value)) return false;
			seen.add(value);
		}
		return true;
	});
