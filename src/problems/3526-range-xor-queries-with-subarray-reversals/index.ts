/**
 * 3526. Range XOR Queries with Subarray Reversals
 *
 * Process queries on `nums`: `[1, index, value]` sets an element,
 * `[2, left, right]` returns the XOR of a range, and `[3, left, right]`
 * reverses a range. Returns the XOR results.
 *
 * An implicit treap: split out a range by position, read or flag its XOR
 * and reversal at the root, and merge back. Reversal is lazy, swapping
 * children as flags are pushed down.
 *
 * @see https://leetcode.com/problems/range-xor-queries-with-subarray-reversals/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n) expected
 * @spaceComplexity O(n)
 *
 * @example
 * rangeXorQueriesWithSubarrayReversals([1, 2, 3, 4, 5], [[2, 1, 3], [1, 2, 10], [3, 0, 4], [2, 0, 4]]); // [5, 8]
 */
export const rangeXorQueriesWithSubarrayReversals = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const value = Int32Array.from(nums);
	const xor = Int32Array.from(nums);
	const size = new Int32Array(n).fill(1);
	const left = new Int32Array(n).fill(-1);
	const right = new Int32Array(n).fill(-1);
	const flipped = new Uint8Array(n);
	let seed = 3526;
	const priority = Int32Array.from({ length: n }, () => {
		seed = (seed * 1103515245 + 12345) & 0x7fffffff;
		return seed;
	});
	const sizeOf = (node: number): number => (node < 0 ? 0 : (size[node] ?? 0));
	const xorOf = (node: number): number => (node < 0 ? 0 : (xor[node] ?? 0));
	const update = (node: number): void => {
		size[node] = 1 + sizeOf(left[node] ?? -1) + sizeOf(right[node] ?? -1);
		xor[node] =
			(value[node] ?? 0) ^ xorOf(left[node] ?? -1) ^ xorOf(right[node] ?? -1);
	};
	const push = (node: number): void => {
		if (node < 0 || !flipped[node]) return;
		const [l, r] = [left[node] ?? -1, right[node] ?? -1];
		left[node] = r;
		right[node] = l;
		if (r >= 0) flipped[r] = (flipped[r] ?? 0) ^ 1;
		if (l >= 0) flipped[l] = (flipped[l] ?? 0) ^ 1;
		flipped[node] = 0;
	};
	/** Splits off the first `count` elements. */
	const split = (node: number, count: number): [number, number] => {
		if (node < 0) return [-1, -1];
		push(node);
		if (sizeOf(left[node] ?? -1) >= count) {
			const [a, b] = split(left[node] ?? -1, count);
			left[node] = b;
			update(node);
			return [a, node];
		}
		const [a, b] = split(
			right[node] ?? -1,
			count - sizeOf(left[node] ?? -1) - 1,
		);
		right[node] = a;
		update(node);
		return [node, b];
	};
	const merge = (a: number, b: number): number => {
		if (a < 0) return b;
		if (b < 0) return a;
		if ((priority[a] ?? 0) > (priority[b] ?? 0)) {
			push(a);
			right[a] = merge(right[a] ?? -1, b);
			update(a);
			return a;
		}
		push(b);
		left[b] = merge(a, left[b] ?? -1);
		update(b);
		return b;
	};
	let root = -1;
	for (let i = 0; i < n; i++) root = merge(root, i);
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0] of queries) {
		if (type === 1) {
			const [before, rest] = split(root, a);
			const [middle, after] = split(rest, 1);
			value[middle] = b;
			update(middle);
			root = merge(merge(before, middle), after);
			continue;
		}
		const [before, rest] = split(root, a);
		const [middle, after] = split(rest, b - a + 1);
		if (type === 2) answers.push(xorOf(middle));
		else if (middle >= 0) flipped[middle] = (flipped[middle] ?? 0) ^ 1;
		root = merge(merge(before, middle), after);
	}
	return answers;
};
