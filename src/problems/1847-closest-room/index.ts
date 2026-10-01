/**
 * 1847. Closest Room
 *
 * Rooms are `[roomId, size]`. For each query `[preferred, minSize]`,
 * returns the room of at least `minSize` whose id is closest to
 * `preferred` (the smaller id on ties), or -1.
 *
 * Offline: answer queries by decreasing `minSize`, adding rooms as they
 * qualify to a Fenwick tree over the sorted ids. The nearest id on each
 * side comes from counting ids up to `preferred` and finding that one (and
 * the next) by descent.
 *
 * @see https://leetcode.com/problems/closest-room/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n + q)
 *
 * @example
 * closestRoom([[1, 4], [2, 3], [3, 5], [4, 1], [5, 2]], [[2, 3], [2, 4], [2, 5]]); // [2, 1, 3]
 */
export const closestRoom = (
	rooms: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const ids = rooms.map(([id = 0]) => id).sort((a, b) => a - b);
	const n = ids.length;
	const tree = new Array<number>(n + 1).fill(0);
	const add = (position: number) => {
		for (let i = position; i <= n; i += i & -i) tree[i] = (tree[i] ?? 0) + 1;
	};
	const countUpTo = (position: number) => {
		let count = 0;
		for (let i = position; i > 0; i -= i & -i) count += tree[i] ?? 0;
		return count;
	};
	/** The position of the k-th present id (1-indexed), or 0 if there are fewer. */
	const kth = (k: number) => {
		let [position, rest] = [0, k];
		for (
			let step = 2 ** Math.floor(Math.log2(Math.max(n, 1)));
			step > 0;
			step >>= 1
		) {
			const next = position + step;
			if (next <= n && (tree[next] ?? 0) < rest) {
				position = next;
				rest -= tree[next] ?? 0;
			}
		}
		return position + 1 > n ? 0 : position + 1;
	};
	const bySize = rooms.toSorted((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
	const order = queries
		.map((_, i) => i)
		.sort((i, j) => (queries[j]?.[1] ?? 0) - (queries[i]?.[1] ?? 0));
	const answer = new Array<number>(queries.length).fill(-1);
	let next = 0;
	for (const i of order) {
		const [preferred = 0, minSize = 0] = queries[i] ?? [];
		for (
			;
			next < bySize.length && (bySize[next]?.[1] ?? 0) >= minSize;
			next++
		) {
			let [low, high] = [0, n];
			const id = bySize[next]?.[0] ?? 0;
			while (low < high) {
				const mid = (low + high) >>> 1;
				if ((ids[mid] ?? 0) < id) low = mid + 1;
				else high = mid;
			}
			add(low + 1);
		}
		let [low, high] = [0, n];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((ids[mid] ?? 0) <= preferred) low = mid + 1;
			else high = mid;
		}
		const atOrBelow = countUpTo(low);
		let best = -1;
		for (const k of [atOrBelow, atOrBelow + 1]) {
			const position = k > 0 ? kth(k) : 0;
			if (position === 0 || k > countUpTo(n)) continue;
			const id = ids[position - 1] ?? 0;
			if (best === -1 || Math.abs(id - preferred) < Math.abs(best - preferred))
				best = id;
		}
		answer[i] = best;
	}
	return answer;
};
