/**
 * 362. Design Hit Counter
 *
 * Counts hits received in the past 5 minutes (300 seconds). Timestamps
 * arrive in chronological order, and several hits can share one.
 *
 * Keeps a queue of `[timestamp, count]` entries, one per distinct second,
 * with a running total. Hits in the same second only bump a count, so the
 * queue holds at most 300 entries however many hits arrive, which answers
 * the follow-up. Entries older than 300 seconds are dropped from the front.
 *
 * @see https://leetcode.com/problems/design-hit-counter/
 * @difficulty Medium
 * @timeComplexity O(1) on average per call
 * @spaceComplexity O(1), at most 300 entries
 *
 * @example
 * const counter = new DesignHitCounter();
 * counter.hit(1);
 * counter.hit(2);
 * counter.getHits(4); // 2
 * counter.getHits(301); // 1
 */
export class DesignHitCounter {
	readonly #entries: [timestamp: number, count: number][] = [];
	#head = 0;
	#total = 0;

	hit(timestamp: number): void {
		const last = this.#entries.at(-1);
		if (last && last[0] === timestamp && this.#entries.length > this.#head)
			last[1]++;
		else this.#entries.push([timestamp, 1]);
		this.#total++;
	}

	/** Hits in the 300 seconds up to and including `timestamp`. */
	getHits(timestamp: number): number {
		while (
			this.#head < this.#entries.length &&
			(this.#entries[this.#head]?.[0] ?? 0) <= timestamp - 300
		) {
			this.#total -= this.#entries[this.#head]?.[1] ?? 0;
			this.#head++;
		}
		return this.#total;
	}
}
