/**
 * 2122. Recover the Original Array
 *
 * `nums` holds `arr[i] - k` and `arr[i] + k` for every element of an
 * unknown array, for some positive `k`. Returns any valid `arr`.
 *
 * The smallest number is some `arr[i] - k`, so `2k` is its gap to one of
 * the others. Try each such even gap, greedily pairing the smallest
 * unpaired number with itself plus `2k`.
 *
 * @see https://leetcode.com/problems/recover-the-original-array/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * recoverTheOriginalArray([2, 10, 6, 4, 8, 12]); // [3, 7, 11]
 */
export const recoverTheOriginalArray = (nums: readonly number[]): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const smallest = sorted[0] ?? 0;
	for (const value of sorted.slice(1)) {
		const gap = value - smallest;
		if (gap === 0 || gap % 2) continue;
		const used = new Uint8Array(sorted.length);
		const original: number[] = [];
		let high = 0;
		for (const [low, lower] of sorted.entries()) {
			if (used[low]) continue;
			high = Math.max(high, low + 1);
			while (
				high < sorted.length &&
				(used[high] || (sorted[high] ?? 0) < lower + gap)
			)
				high++;
			if (sorted[high] !== lower + gap) break;
			used[high] = 1;
			original.push(lower + gap / 2);
		}
		if (original.length * 2 === sorted.length) return original;
	}
	return [];
};
