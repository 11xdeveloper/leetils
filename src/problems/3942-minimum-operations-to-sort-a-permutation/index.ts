/**
 * 3942. Minimum Operations to Sort a Permutation
 *
 * Using only "reverse the whole array" and "rotate left by one", returns
 * the fewest operations that sort the permutation `nums`, or -1.
 *
 * Both operations keep the array a rotation of 0, 1, …, n - 1, forwards
 * or backwards, so that's required, and each arrangement is a pair
 * (direction, starting value). Breadth-first search over those 2n states.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-sort-a-permutation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToSortAPermutation([0, 2, 1]); // 2
 */
export const minimumOperationsToSortAPermutation = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const first = nums[0] ?? 0;
	const forwards = nums.every((x, i) => x === (first + i) % n);
	const backwards = nums.every((x, i) => x === (((first - i) % n) + n) % n);
	if (!forwards && !backwards) return -1;
	// State (flip, start): flip 0 means a[i] = start + i, flip 1 means a[i] = start - i (mod n).
	const distance = new Int32Array(2 * n).fill(-1);
	const start = (forwards ? 0 : n) + first;
	distance[start] = 0;
	const queue = [start];
	for (let q = 0; q < queue.length; q++) {
		const state = queue[q] ?? 0;
		if (state === 0) return distance[0] ?? 0;
		const [flip, value] = [state >= n ? 1 : 0, state % n];
		const rotated = flip === 0 ? (value + 1) % n : (value - 1 + n) % n;
		const reversed = flip === 0 ? (value - 1 + n) % n : (value + 1) % n;
		for (const next of [flip * n + rotated, (1 - flip) * n + reversed])
			if (distance[next] === -1) {
				distance[next] = (distance[state] ?? 0) + 1;
				queue.push(next);
			}
	}
	return -1;
};
