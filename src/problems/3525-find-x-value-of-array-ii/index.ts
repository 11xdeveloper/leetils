/**
 * 3525. Find X Value of Array II
 *
 * Each query `[index, value, start, x]` sets `nums[index] = value`, then
 * counts the non-empty prefixes of `nums[start..]` whose product is x mod
 * k. Returns the counts.
 *
 * A segment tree whose nodes store their product mod k and how many of
 * their prefixes leave each remainder. Joining two halves, the right half's
 * prefixes get multiplied by the left half's product.
 *
 * @see https://leetcode.com/problems/find-x-value-of-array-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) · k log n)
 * @spaceComplexity O(n · k)
 *
 * @example
 * findXValueOfArrayII([1, 2, 3, 4, 5], 3, [[2, 2, 0, 2], [3, 3, 3, 0], [0, 1, 0, 1]]); // [2, 2, 2]
 */
export const findXValueOfArrayII = (
	nums: readonly number[],
	k: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	let size = 1;
	while (size < n) size *= 2;
	const product = new Int32Array(2 * size).fill(1 % k);
	const prefixes = new Float64Array(2 * size * k);
	const setLeaf = (i: number, value: number): void => {
		const node = size + i;
		const r = value % k;
		product[node] = r;
		prefixes.fill(0, node * k, node * k + k);
		prefixes[node * k + r] = 1;
	};
	const combine = (
		leftProduct: number,
		leftPrefixes: ArrayLike<number>,
		leftOffset: number,
		rightProduct: number,
		rightPrefixes: ArrayLike<number>,
		rightOffset: number,
		out: Float64Array,
		outOffset: number,
	): number => {
		for (let r = 0; r < k; r++)
			out[outOffset + r] = leftPrefixes[leftOffset + r] ?? 0;
		for (let r = 0; r < k; r++) {
			const at = outOffset + ((leftProduct * r) % k);
			out[at] = (out[at] ?? 0) + (rightPrefixes[rightOffset + r] ?? 0);
		}
		return (leftProduct * rightProduct) % k;
	};
	const pull = (node: number): void => {
		const scratch = new Float64Array(k);
		product[node] = combine(
			product[2 * node] ?? 0,
			prefixes,
			2 * node * k,
			product[2 * node + 1] ?? 0,
			prefixes,
			(2 * node + 1) * k,
			scratch,
			0,
		);
		prefixes.set(scratch, node * k);
	};
	nums.forEach((num, i) => {
		setLeaf(i, num);
	});
	for (let node = size - 1; node > 0; node--) pull(node);
	const query = (start: number): Float64Array => {
		// Collect the nodes covering [start, size) from left to right.
		const nodes: number[] = [];
		const right: number[] = [];
		for (let lo = start + size, hi = 2 * size; lo < hi; lo >>= 1, hi >>= 1) {
			if (lo & 1) nodes.push(lo++);
			if (hi & 1) right.push(--hi);
		}
		nodes.push(...right.reverse());
		let accumulated = new Float64Array(k);
		let accumulatedProduct = 1 % k;
		for (const node of nodes) {
			const next = new Float64Array(k);
			accumulatedProduct = combine(
				accumulatedProduct,
				accumulated,
				0,
				product[node] ?? 0,
				prefixes,
				node * k,
				next,
				0,
			);
			accumulated = next;
		}
		return accumulated;
	};
	return queries.map(([index = 0, value = 0, start = 0, x = 0]) => {
		setLeaf(index, value);
		for (let node = (size + index) >> 1; node > 0; node >>= 1) pull(node);
		return query(start)[x] ?? 0;
	});
};
