/**
 * 2866. Beautiful Towers II
 *
 * Tower heights must form a mountain, rising then falling, with each at
 * least 1 and at most `maxHeights[i]`. Returns the largest total height,
 * for arrays too long to try every peak directly.
 *
 * With a monotonic stack, compute the best non-decreasing total ending at
 * each index from the left, and the best non-increasing total from the
 * right; a peak combines both.
 *
 * @see https://leetcode.com/problems/beautiful-towers-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * beautifulTowersII([6, 5, 3, 9, 2, 7]); // 22
 */
export const beautifulTowersII = (maxHeights: readonly number[]): number => {
	const n = maxHeights.length;
	const sweep = (indices: number[]): number[] => {
		const totals = Array.from({ length: n }, () => 0);
		const stack: number[] = [];
		for (const i of indices) {
			const height = maxHeights[i] ?? 0;
			while (stack.length > 0 && (maxHeights[stack.at(-1) ?? 0] ?? 0) > height)
				stack.pop();
			const previous = stack.at(-1);
			const span =
				previous === undefined
					? indices[0] === 0
						? i + 1
						: n - i
					: Math.abs(i - previous);
			totals[i] =
				(previous === undefined ? 0 : (totals[previous] ?? 0)) + span * height;
			stack.push(i);
		}
		return totals;
	};
	const indices = [...Array(n).keys()];
	const left = sweep(indices);
	const right = sweep(indices.toReversed());
	let best = 0;
	for (let i = 0; i < n; i++)
		best = Math.max(
			best,
			(left[i] ?? 0) + (right[i] ?? 0) - (maxHeights[i] ?? 0),
		);
	return best;
};
