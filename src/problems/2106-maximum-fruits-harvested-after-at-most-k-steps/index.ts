/**
 * 2106. Maximum Fruits Harvested After at Most K Steps
 *
 * `fruits[i] = [position, amount]`, sorted by position. Walking at most
 * `k` steps from `startPos` along a line, returns the most fruit you can
 * collect.
 *
 * You collect a contiguous range of positions, walking to its nearer end
 * first and then across it. Slide a window over the fruits, shrinking it
 * from the left while that walk is too long.
 *
 * @see https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumFruitsHarvestedAfterAtMostKSteps([[2, 8], [6, 3], [8, 6]], 5, 4); // 9
 */
export const maximumFruitsHarvestedAfterAtMostKSteps = (
	fruits: readonly (readonly number[])[],
	startPos: number,
	k: number,
): number => {
	const steps = (left: number, right: number): number => {
		const [low, high] = [Math.min(left, startPos), Math.max(right, startPos)];
		return high - low + Math.min(startPos - low, high - startPos);
	};
	let [best, sum, start] = [0, 0, 0];
	for (const [position = 0, amount = 0] of fruits) {
		sum += amount;
		while (
			start < fruits.length &&
			steps(fruits[start]?.[0] ?? 0, position) > k
		)
			sum -= fruits[start++]?.[1] ?? 0;
		best = Math.max(best, sum);
	}
	return best;
};
