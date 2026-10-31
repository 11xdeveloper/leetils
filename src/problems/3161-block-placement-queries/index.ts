/** A segment tree over positions answering prefix maxima. */
class MaxTree {
	readonly #size: number;
	readonly #tree: Float64Array;

	constructor(length: number) {
		let size = 1;
		while (size < length) size *= 2;
		this.#size = size;
		this.#tree = new Float64Array(2 * size).fill(Number.NEGATIVE_INFINITY);
	}

	set(i: number, value: number): void {
		let node = i + this.#size;
		this.#tree[node] = value;
		for (node >>= 1; node > 0; node >>= 1)
			this.#tree[node] = Math.max(
				this.#tree[2 * node] ?? 0,
				this.#tree[2 * node + 1] ?? 0,
			);
	}

	/** The largest value at positions 0 to `i`. */
	upTo(i: number): number {
		let best = Number.NEGATIVE_INFINITY;
		for (
			let lo = this.#size, hi = i + this.#size + 1;
			lo < hi;
			lo >>= 1, hi >>= 1
		) {
			if (lo & 1) best = Math.max(best, this.#tree[lo++] ?? 0);
			if (hi & 1) best = Math.max(best, this.#tree[--hi] ?? 0);
		}
		return best;
	}
}

/**
 * 3161. Block Placement Queries
 *
 * On a number line, `[1, x]` places an obstacle at x and `[2, x, sz]` asks
 * whether a block of length `sz` fits somewhere in [0, x] without
 * overlapping an obstacle (touching is fine). Returns the answers to the
 * second kind of query.
 *
 * Work backwards from the final set of obstacles, so obstacles are only
 * ever removed and gaps only merge. A segment tree holds, at each obstacle,
 * the gap since the previous one; another finds the last obstacle at or
 * before x. A query fits if the largest gap up to x, or the space after the
 * last obstacle, is at least `sz`.
 *
 * @see https://leetcode.com/problems/block-placement-queries/
 * @difficulty Hard
 * @timeComplexity O((q + X) log X), for positions up to X
 * @spaceComplexity O(q + X)
 *
 * @example
 * blockPlacementQueries([[1, 2], [2, 3, 3], [2, 3, 1], [2, 2, 2]]); // [false, true, true]
 */
export const blockPlacementQueries = (
	queries: readonly (readonly number[])[],
): boolean[] => {
	const limit = Math.max(...queries.map((query) => query[1] ?? 0)) + 1;
	const obstacles = [
		0,
		...queries.filter((query) => query[0] === 1).map((query) => query[1] ?? 0),
	].sort((a, b) => a - b);
	const previous = new Map<number, number>();
	const next = new Map<number, number>();
	const gaps = new MaxTree(limit);
	const present = new MaxTree(limit);
	obstacles.forEach((position, i) => {
		const before = obstacles[i - 1];
		const after = obstacles[i + 1];
		if (before !== undefined) previous.set(position, before);
		if (after !== undefined) next.set(position, after);
		gaps.set(position, before === undefined ? 0 : position - before);
		present.set(position, position);
	});
	const answers: boolean[] = [];
	for (let q = queries.length - 1; q >= 0; q--) {
		const [type = 0, x = 0, size = 0] = queries[q] ?? [];
		if (type === 2) {
			const last = present.upTo(x);
			answers.push(Math.max(gaps.upTo(x), x - last) >= size);
			continue;
		}
		const before = previous.get(x) ?? 0;
		const after = next.get(x);
		gaps.set(x, Number.NEGATIVE_INFINITY);
		present.set(x, Number.NEGATIVE_INFINITY);
		next.delete(x);
		previous.delete(x);
		if (after === undefined) next.delete(before);
		else {
			next.set(before, after);
			previous.set(after, before);
			gaps.set(after, after - before);
		}
	}
	return answers.reverse();
};
