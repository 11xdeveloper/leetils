/**
 * 3569. Maximize Count of Distinct Primes After Split
 *
 * Each query sets one element of `nums`; afterwards, split `nums` into a
 * non-empty prefix and suffix to maximise the distinct primes in the
 * prefix plus those in the suffix. Returns that maximum after each query.
 *
 * Every distinct prime counts once, plus once more for splits between its
 * first and last occurrence. Keep each prime's positions sorted, and a
 * segment tree over split points with range additions for those spans and
 * a maximum query.
 *
 * @see https://leetcode.com/problems/maximize-count-of-distinct-primes-after-split/
 * @difficulty Hard
 * @timeComplexity O(V log log V + (n + q)(log n + c)), for c copies of a prime
 * @spaceComplexity O(V + n)
 *
 * @example
 * maximizeCountOfDistinctPrimesAfterSplit([2, 1, 3, 1, 2], [[1, 2], [3, 3]]); // [3, 4]
 */
export const maximizeCountOfDistinctPrimesAfterSplit = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const limit = Math.max(...nums, ...queries.map((q) => q[1] ?? 0)) + 1;
	const composite = new Uint8Array(limit + 1);
	composite[0] = composite[1] = 1;
	for (let p = 2; p * p <= limit; p++)
		if (!composite[p]) for (let x = p * p; x <= limit; x += p) composite[x] = 1;
	// Split k (1 to n - 1) puts indices below k in the prefix.
	let size = 1;
	while (size < n) size *= 2;
	const max = new Float64Array(2 * size);
	const lazy = new Float64Array(2 * size);
	const add = (
		node: number,
		lo: number,
		hi: number,
		from: number,
		to: number,
		delta: number,
	): void => {
		if (to <= lo || hi <= from) return;
		if (from <= lo && hi <= to) {
			max[node] = (max[node] ?? 0) + delta;
			lazy[node] = (lazy[node] ?? 0) + delta;
			return;
		}
		const mid = (lo + hi) >>> 1;
		add(2 * node, lo, mid, from, to, delta);
		add(2 * node + 1, mid, hi, from, to, delta);
		max[node] =
			(lazy[node] ?? 0) + Math.max(max[2 * node] ?? 0, max[2 * node + 1] ?? 0);
	};
	// Leaves past n - 1 must never win.
	for (let k = 0; k < size; k++)
		if (k < 1 || k > n - 1) add(1, 0, size, k, k + 1, Number.NEGATIVE_INFINITY);
	const positions = new Map<number, number[]>();
	const span = (prime: number, delta: number): void => {
		const list = positions.get(prime);
		if (!list || list.length < 2) return;
		add(1, 0, size, (list[0] ?? 0) + 1, (list.at(-1) ?? 0) + 1, delta);
	};
	const insert = (prime: number, index: number): void => {
		span(prime, -1);
		const list = positions.get(prime) ?? [];
		let lo = 0;
		while (lo < list.length && (list[lo] ?? 0) < index) lo++;
		list.splice(lo, 0, index);
		positions.set(prime, list);
		span(prime, 1);
	};
	const remove = (prime: number, index: number): void => {
		span(prime, -1);
		const list = positions.get(prime) ?? [];
		list.splice(list.indexOf(index), 1);
		if (list.length === 0) positions.delete(prime);
		span(prime, 1);
	};
	const values = [...nums];
	values.forEach((value, i) => {
		if (!composite[value]) insert(value, i);
	});
	return queries.map(([index = 0, value = 0]) => {
		const old = values[index] ?? 0;
		if (!composite[old]) remove(old, index);
		values[index] = value;
		if (!composite[value]) insert(value, index);
		return positions.size + Math.max(0, max[1] ?? 0);
	});
};
