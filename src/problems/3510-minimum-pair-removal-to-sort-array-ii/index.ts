import { Heap } from "../../internal/heap";

/**
 * 3510. Minimum Pair Removal to Sort Array II
 *
 * Repeatedly replace the neighbouring pair with the smallest sum (the
 * leftmost on a tie) by its sum. Returns how many replacements it takes for
 * `nums` to be non-decreasing, for arrays up to 10⁵ long.
 *
 * Keep the array as a linked list, a heap of (pair sum, left index) with
 * stale entries skipped, and a count of neighbouring pairs that are out of
 * order. Each merge only changes the pairs touching it, so the count stays
 * current and the loop stops when it reaches zero.
 *
 * @see https://leetcode.com/problems/minimum-pair-removal-to-sort-array-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumPairRemovalToSortArrayII([5, 2, 3, 1]); // 2
 */
export const minimumPairRemovalToSortArrayII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const value = [...nums];
	const next = Int32Array.from({ length: n }, (_, i) =>
		i + 1 < n ? i + 1 : -1,
	);
	const previous = Int32Array.from({ length: n }, (_, i) => i - 1);
	const alive = new Uint8Array(n).fill(1);
	const pairs = new Heap<[sum: number, left: number]>(
		(a, b) => a[0] - b[0] || a[1] - b[1],
	);
	let bad = 0;
	const outOfOrder = (left: number): number => {
		const right = next[left] ?? -1;
		return left >= 0 && right >= 0 && (value[right] ?? 0) < (value[left] ?? 0)
			? 1
			: 0;
	};
	for (let i = 0; i + 1 < n; i++) {
		pairs.push([(value[i] ?? 0) + (value[i + 1] ?? 0), i]);
		bad += outOfOrder(i);
	}
	let operations = 0;
	while (bad > 0) {
		const top = pairs.pop();
		if (!top) break;
		const [sum, left] = top;
		const right = next[left] ?? -1;
		if (
			!alive[left] ||
			right < 0 ||
			(value[left] ?? 0) + (value[right] ?? 0) !== sum
		)
			continue;
		const before = previous[left] ?? -1;
		bad -= outOfOrder(before) + outOfOrder(left) + outOfOrder(right);
		value[left] = sum;
		alive[right] = 0;
		const after = next[right] ?? -1;
		next[left] = after;
		if (after >= 0) previous[after] = left;
		bad += outOfOrder(before) + outOfOrder(left);
		if (before >= 0) pairs.push([(value[before] ?? 0) + sum, before]);
		if (after >= 0) pairs.push([sum + (value[after] ?? 0), left]);
		operations++;
	}
	return operations;
};
