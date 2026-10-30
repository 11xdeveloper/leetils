import { Heap } from "../../internal/heap";

/**
 * 2102. Sequentially Ordinal Rank Tracker
 *
 * Tracks scenic locations, ranked by higher score then smaller name. The
 * `i`-th call to `get` returns the `i`-th best location added so far.
 *
 * Keep the `i - 1` best in a heap with the worst on top, and the rest in a
 * heap with the best on top. Adding pushes through the first heap so the
 * split stays right; `get` moves the best of the rest across.
 *
 * @see https://leetcode.com/problems/sequentially-ordinal-rank-tracker/
 * @difficulty Hard
 * @timeComplexity O(log n) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const tracker = new SequentiallyOrdinalRankTracker();
 * tracker.add("bradford", 2);
 * tracker.add("branford", 3);
 * tracker.get(); // "branford"
 */
export class SequentiallyOrdinalRankTracker {
	static #better(
		a: [name: string, score: number],
		b: [name: string, score: number],
	): number {
		return b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
	}

	readonly #top = new Heap<[name: string, score: number]>((a, b) =>
		SequentiallyOrdinalRankTracker.#better(b, a),
	);
	readonly #rest = new Heap<[name: string, score: number]>(
		SequentiallyOrdinalRankTracker.#better,
	);

	add(name: string, score: number): void {
		this.#top.push([name, score]);
		const worst = this.#top.pop();
		if (worst) this.#rest.push(worst);
	}

	get(): string {
		const next = this.#rest.pop();
		if (!next) return "";
		this.#top.push(next);
		return next[0];
	}
}
