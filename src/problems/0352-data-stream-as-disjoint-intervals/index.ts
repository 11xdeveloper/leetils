/**
 * 352. Data Stream as Disjoint Intervals
 *
 * Accepts a stream of non-negative integers and summarises the numbers seen
 * so far as sorted, disjoint intervals `[start, end]`, merging neighbours
 * like `[1, 2]` and `[3, 3]` into `[1, 3]`.
 *
 * Keeps the intervals sorted. A binary search finds where a new number
 * goes; it's ignored if already covered, extends or joins the intervals on
 * either side if it touches them, or is inserted on its own otherwise.
 *
 * @see https://leetcode.com/problems/data-stream-as-disjoint-intervals/
 * @difficulty Hard
 * @timeComplexity O(k) per addNum for the array insertion, O(k) for getIntervals, where k is the number of intervals
 * @spaceComplexity O(k)
 *
 * @example
 * const ranges = new DataStreamAsDisjointIntervals();
 * ranges.addNum(1);
 * ranges.addNum(3);
 * ranges.addNum(2);
 * ranges.getIntervals(); // [[1, 3]]
 */
export class DataStreamAsDisjointIntervals {
	readonly #intervals: [start: number, end: number][] = [];

	addNum(value: number): void {
		const intervals = this.#intervals;
		// The first interval that starts after value.
		let low = 0;
		let high = intervals.length;
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if ((intervals[mid]?.[0] ?? 0) <= value) low = mid + 1;
			else high = mid;
		}

		const before = intervals[low - 1];
		const after = intervals[low];
		if (before && before[1] >= value) return;

		const joinsBefore = before !== undefined && before[1] === value - 1;
		const joinsAfter = after !== undefined && after[0] === value + 1;
		if (before && after && joinsBefore && joinsAfter) {
			before[1] = after[1];
			intervals.splice(low, 1);
		} else if (before && joinsBefore) {
			before[1] = value;
		} else if (after && joinsAfter) {
			after[0] = value;
		} else {
			intervals.splice(low, 0, [value, value]);
		}
	}

	getIntervals(): number[][] {
		return this.#intervals.map(([start, end]) => [start, end]);
	}
}
