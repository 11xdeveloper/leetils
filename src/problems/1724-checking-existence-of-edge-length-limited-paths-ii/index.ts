/**
 * 1724. Checking Existence of Edge Length Limited Paths II
 *
 * Built from an undirected graph, `query(p, q, limit)` answers whether `p`
 * and `q` are joined by a path whose every edge is shorter than `limit`.
 *
 * A union–find that remembers when each link was made. Kruskal's
 * algorithm unites the edges in increasing length with union by size and
 * no path compression, so trees stay shallow; each link records the edge
 * length that created it. A query climbs from each node only along links
 * shorter than `limit` and compares where they stop.
 *
 * @see https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii/
 * @difficulty Hard
 * @timeComplexity O(E log E) to build, O(log n) per query
 * @spaceComplexity O(n)
 *
 * @example
 * new CheckingExistenceOfEdgeLengthLimitedPathsII(6, [[0, 2, 4], [0, 3, 2], [1, 2, 3], [2, 3, 1], [4, 5, 5]]).query(2, 0, 3); // true
 */
export class CheckingExistenceOfEdgeLengthLimitedPathsII {
	readonly #parent: number[];
	readonly #linkedAt: number[];

	constructor(n: number, edgeList: readonly (readonly number[])[]) {
		this.#parent = Array.from({ length: n }, (_, i) => i);
		this.#linkedAt = new Array<number>(n).fill(Infinity);
		const size = new Array<number>(n).fill(1);
		for (const [u = 0, v = 0, length = 0] of edgeList.toSorted(
			(a, b) => (a[2] ?? 0) - (b[2] ?? 0),
		)) {
			let [a, b] = [this.#root(u, Infinity), this.#root(v, Infinity)];
			if (a === b) continue;
			if ((size[a] ?? 0) < (size[b] ?? 0)) [a, b] = [b, a];
			this.#parent[b] = a;
			this.#linkedAt[b] = length;
			size[a] = (size[a] ?? 0) + (size[b] ?? 0);
		}
	}

	query(p: number, q: number, limit: number): boolean {
		return this.#root(p, limit) === this.#root(q, limit);
	}

	/** Climbs from `node` along links made by edges shorter than `limit`. */
	#root(node: number, limit: number): number {
		let current = node;
		while (
			this.#parent[current] !== current &&
			(this.#linkedAt[current] ?? Infinity) < limit
		) {
			current = this.#parent[current] ?? current;
		}
		return current;
	}
}
