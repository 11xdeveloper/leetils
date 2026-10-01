/**
 * 1825. Finding MK Average
 *
 * A stream supporting `addElement` and `calculateMKAverage`: the floor of
 * the average of the last `m` elements after dropping their `k` smallest
 * and `k` largest, or -1 before there are `m` elements.
 *
 * Two Fenwick trees over values (at most 10^5) hold the count and the sum
 * of the window's elements. The sum of the `j` smallest comes from a
 * descent through the count tree, so the middle part is the sum of the
 * `m − k` smallest minus the sum of the `k` smallest.
 *
 * @see https://leetcode.com/problems/finding-mk-average/
 * @difficulty Hard
 * @timeComplexity O(log V) per operation for values up to V
 * @spaceComplexity O(V + m)
 *
 * @example
 * const stream = new FindingMkAverage(3, 1);
 * stream.addElement(3);
 * stream.addElement(1);
 * stream.addElement(10);
 * stream.calculateMKAverage(); // 3
 */
export class FindingMkAverage {
	static readonly #MAX_VALUE = 100_000;
	readonly #m: number;
	readonly #k: number;
	readonly #window: number[] = [];
	#head = 0;
	readonly #counts = new Array<number>(FindingMkAverage.#MAX_VALUE + 1).fill(0);
	readonly #sums = new Array<number>(FindingMkAverage.#MAX_VALUE + 1).fill(0);

	constructor(m: number, k: number) {
		this.#m = m;
		this.#k = k;
	}

	addElement(num: number): void {
		this.#window.push(num);
		this.#update(num, 1);
		if (this.#window.length - this.#head > this.#m) {
			this.#update(this.#window[this.#head] ?? 0, -1);
			this.#head++;
		}
	}

	calculateMKAverage(): number {
		if (this.#window.length - this.#head < this.#m) return -1;
		const middle =
			this.#smallestSum(this.#m - this.#k) - this.#smallestSum(this.#k);
		return Math.floor(middle / (this.#m - 2 * this.#k));
	}

	#update(value: number, change: number): void {
		for (let i = value; i <= FindingMkAverage.#MAX_VALUE; i += i & -i) {
			this.#counts[i] = (this.#counts[i] ?? 0) + change;
			this.#sums[i] = (this.#sums[i] ?? 0) + change * value;
		}
	}

	/** The sum of the `j` smallest elements in the window. */
	#smallestSum(j: number): number {
		let [position, count, sum] = [0, 0, 0];
		for (
			let step = 2 ** Math.floor(Math.log2(FindingMkAverage.#MAX_VALUE));
			step > 0;
			step >>= 1
		) {
			const next = position + step;
			if (
				next <= FindingMkAverage.#MAX_VALUE &&
				count + (this.#counts[next] ?? 0) < j
			) {
				position = next;
				count += this.#counts[next] ?? 0;
				sum += this.#sums[next] ?? 0;
			}
		}
		// Every value up to `position` is taken; the rest are copies of `position + 1`.
		return sum + (j - count) * (position + 1);
	}
}
