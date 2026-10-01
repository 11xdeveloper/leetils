/**
 * 1157. Online Majority Element In Subarray
 *
 * Answers `query(left, right, threshold)`: the value appearing at least
 * `threshold` times in `arr[left … right]`, where `threshold` is more than
 * half the range, or -1 if there's none.
 *
 * A segment tree where each node holds the Boyer–Moore majority vote of its
 * range (a candidate and a surplus count). Votes combine by cancelling
 * against each other, and a true majority always survives, so a query finds
 * the only possible answer in O(log n). Binary searches over that value's
 * sorted positions then count its occurrences in the range.
 *
 * @see https://leetcode.com/problems/online-majority-element-in-subarray/
 * @difficulty Hard
 * @timeComplexity O(n) to build, O(log n) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const checker = new OnlineMajorityElementInSubarray([1, 1, 2, 2, 1, 1]);
 * checker.query(0, 5, 4); // 1
 * checker.query(0, 3, 3); // -1
 */
export class OnlineMajorityElementInSubarray {
	readonly #n: number;
	readonly #candidate: Int32Array;
	readonly #count: Int32Array;
	readonly #positions = new Map<number, number[]>();

	constructor(arr: readonly number[]) {
		const n = arr.length;
		this.#n = n;
		this.#candidate = new Int32Array(2 * n);
		this.#count = new Int32Array(2 * n);
		arr.forEach((value, i) => {
			this.#candidate[n + i] = value;
			this.#count[n + i] = 1;
			const list = this.#positions.get(value);
			if (list) list.push(i);
			else this.#positions.set(value, [i]);
		});
		for (let i = n - 1; i > 0; i--) {
			const [candidate, count] = this.#merge(
				[this.#candidate[2 * i] ?? 0, this.#count[2 * i] ?? 0],
				[this.#candidate[2 * i + 1] ?? 0, this.#count[2 * i + 1] ?? 0],
			);
			this.#candidate[i] = candidate;
			this.#count[i] = count;
		}
	}

	query(left: number, right: number, threshold: number): number {
		let vote: [number, number] = [0, 0];
		for (
			let lo = left + this.#n, hi = right + this.#n + 1;
			lo < hi;
			lo >>= 1, hi >>= 1
		) {
			if (lo & 1) {
				vote = this.#merge(vote, [
					this.#candidate[lo] ?? 0,
					this.#count[lo] ?? 0,
				]);
				lo++;
			}
			if (hi & 1) {
				hi--;
				vote = this.#merge(vote, [
					this.#candidate[hi] ?? 0,
					this.#count[hi] ?? 0,
				]);
			}
		}
		const positions = this.#positions.get(vote[0]) ?? [];
		const count =
			lowerBound(positions, right + 1) - lowerBound(positions, left);
		return count >= threshold ? vote[0] : -1;
	}

	#merge(
		[a, countA]: readonly [number, number],
		[b, countB]: readonly [number, number],
	): [number, number] {
		if (a === b) return [a, countA + countB];
		return countA >= countB ? [a, countA - countB] : [b, countB - countA];
	}
}

/** The index of the first element of the sorted `list` that is at least `value`. */
const lowerBound = (list: readonly number[], value: number): number => {
	let [low, high] = [0, list.length];
	while (low < high) {
		const mid = (low + high) >>> 1;
		if ((list[mid] ?? 0) < value) low = mid + 1;
		else high = mid;
	}
	return low;
};
