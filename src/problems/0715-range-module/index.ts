/**
 * 715. Range Module
 *
 * Tracks a set of real numbers made of half-open ranges `[left, right)`.
 * `addRange` covers a range, `removeRange` uncovers one, and `queryRange`
 * returns whether a range is entirely covered.
 *
 * Keeps the covered set as sorted, disjoint, non-touching ranges. Adding or
 * removing replaces the ranges that meet the given one with at most one or
 * two new ones; a query checks whether a single range contains it.
 *
 * @see https://leetcode.com/problems/range-module/
 * @difficulty Hard
 * @timeComplexity O(n) per add or remove for n stored ranges, O(log n) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const module = new RangeModule();
 * module.addRange(10, 20);
 * module.removeRange(14, 16);
 * module.queryRange(10, 14); // true
 */
export class RangeModule {
	#ranges: [left: number, right: number][] = [];

	addRange(left: number, right: number): void {
		const kept: [number, number][] = [];
		for (const [start, end] of this.#ranges) {
			if (end < left || start > right) kept.push([start, end]);
			else {
				left = Math.min(left, start);
				right = Math.max(right, end);
			}
		}
		kept.push([left, right]);
		this.#ranges = kept.sort((a, b) => a[0] - b[0]);
	}

	queryRange(left: number, right: number): boolean {
		let low = 0;
		let high = this.#ranges.length - 1;
		while (low <= high) {
			const mid = (low + high) >>> 1;
			const [start, end] = this.#ranges[mid] ?? [0, 0];
			if (end <= left) low = mid + 1;
			else if (start > left) high = mid - 1;
			else return right <= end;
		}
		return false;
	}

	removeRange(left: number, right: number): void {
		const kept: [number, number][] = [];
		for (const [start, end] of this.#ranges) {
			if (end <= left || start >= right) {
				kept.push([start, end]);
				continue;
			}
			if (start < left) kept.push([start, left]);
			if (end > right) kept.push([right, end]);
		}
		this.#ranges = kept;
	}
}
