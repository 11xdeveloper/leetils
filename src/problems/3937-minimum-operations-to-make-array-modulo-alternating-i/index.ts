/**
 * 3937. Minimum Operations to Make Array Modulo Alternating I
 *
 * One operation adds or subtracts 1. Returns the fewest operations after
 * which the even indices share one remainder mod `k` and the odd indices
 * a different one.
 *
 * Cost each remainder for the even and the odd indices separately (each
 * element moves to the nearest number with it), then take the best pair
 * of different remainders.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-modulo-alternating-i/
 * @difficulty Medium
 * @timeComplexity O(n · k + k²)
 * @spaceComplexity O(k)
 *
 * @example
 * minimumOperationsToMakeArrayModuloAlternatingI([1, 4, 2, 8], 3); // 2
 */
export const minimumOperationsToMakeArrayModuloAlternatingI = (
	nums: readonly number[],
	k: number,
): number => {
	const costs = [new Array<number>(k).fill(0), new Array<number>(k).fill(0)];
	nums.forEach((num, i) => {
		const r = num % k;
		const side = costs[i % 2] ?? [];
		for (let x = 0; x < k; x++) {
			const up = (x - r + k) % k;
			side[x] = (side[x] ?? 0) + Math.min(up, k - up);
		}
	});
	const [even = [], odd = []] = costs;
	let best = Number.POSITIVE_INFINITY;
	for (let x = 0; x < k; x++)
		for (let y = 0; y < k; y++)
			if (x !== y) best = Math.min(best, (even[x] ?? 0) + (odd[y] ?? 0));
	return best;
};
