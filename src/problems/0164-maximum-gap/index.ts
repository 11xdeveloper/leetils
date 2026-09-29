/**
 * 164. Maximum Gap
 *
 * Returns the largest difference between two successive values in the
 * sorted form of `nums`, or 0 if there are fewer than two values, in linear
 * time.
 *
 * The `n - 1` gaps add up to `max - min`, so the largest is at least their
 * average. Splitting the range into buckets of the average's integer part
 * means a gap inside a bucket is always smaller than that, so it can't be
 * the answer. Only each bucket's smallest and largest values matter, and
 * the answer is the largest jump from one non-empty bucket's largest value
 * to the next one's smallest.
 *
 * @see https://leetcode.com/problems/maximum-gap/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumGap([3, 6, 9, 1]); // 3
 */
export const maximumGap = (nums: readonly number[]): number => {
	if (nums.length < 2) return 0;

	const min = Math.min(...nums);
	const max = Math.max(...nums);
	if (min === max) return 0;

	const bucketWidth = Math.max(1, Math.floor((max - min) / (nums.length - 1)));
	const bucketCount = Math.floor((max - min) / bucketWidth) + 1;
	const lows = new Array<number>(bucketCount).fill(Number.POSITIVE_INFINITY);
	const highs = new Array<number>(bucketCount).fill(Number.NEGATIVE_INFINITY);

	for (const num of nums) {
		const bucket = Math.floor((num - min) / bucketWidth);
		lows[bucket] = Math.min(lows[bucket] ?? num, num);
		highs[bucket] = Math.max(highs[bucket] ?? num, num);
	}

	let gap = 0;
	let previousHigh = min;
	for (let bucket = 0; bucket < bucketCount; bucket++) {
		const low = lows[bucket] ?? Number.POSITIVE_INFINITY;
		if (low === Number.POSITIVE_INFINITY) continue;
		gap = Math.max(gap, low - previousHigh);
		previousHigh = highs[bucket] ?? previousHigh;
	}

	return gap;
};
