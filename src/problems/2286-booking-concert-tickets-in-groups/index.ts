/**
 * 2286. Booking Concert Tickets in Groups
 *
 * A hall has `n` rows of `m` seats, filled from the left. `gather` seats
 * `k` people together in the first row up to `maxRow` with room, returning
 * `[row, firstSeat]` or `[]`. `scatter` seats `k` people anywhere in rows
 * up to `maxRow`, filling the earliest seats first, if they all fit.
 *
 * A segment tree over rows keeps each range's most free seats in a row
 * (to find the first row with room) and total free seats. Scatter fills
 * rows from the first one not yet full, which only moves forward.
 *
 * @see https://leetcode.com/problems/booking-concert-tickets-in-groups/
 * @difficulty Hard
 * @timeComplexity O(log n) per gather, O(log n) amortised per scatter
 * @spaceComplexity O(n)
 *
 * @example
 * const hall = new BookingConcertTicketsInGroups(2, 5);
 * hall.gather(4, 0); // [0, 0]
 * hall.gather(2, 0); // []
 * hall.scatter(5, 1); // true
 */
export class BookingConcertTicketsInGroups {
	readonly #n: number;
	readonly #m: number;
	readonly #most: number[];
	readonly #free: number[];
	#firstOpen = 0;

	constructor(n: number, m: number) {
		this.#n = n;
		this.#m = m;
		this.#most = new Array<number>(4 * n).fill(0);
		this.#free = new Array<number>(4 * n).fill(0);
		this.#build(1, 0, n - 1);
	}

	gather(k: number, maxRow: number): number[] {
		if ((this.#most[1] ?? 0) < k) return [];
		const row = this.#firstWithRoom(1, 0, this.#n - 1, k);
		if (row === -1 || row > maxRow) return [];
		const free = this.#freeIn(row);
		this.#take(row, k);
		return [row, this.#m - free];
	}

	scatter(k: number, maxRow: number): boolean {
		if (this.#freeUpTo(1, 0, this.#n - 1, maxRow) < k) return false;
		while (k > 0) {
			const row = this.#firstOpen;
			const taken = Math.min(k, this.#freeIn(row));
			this.#take(row, taken);
			k -= taken;
			if (this.#freeIn(row) === 0) this.#firstOpen++;
		}
		return true;
	}

	#build(node: number, lo: number, hi: number): void {
		this.#most[node] = this.#m;
		this.#free[node] = (hi - lo + 1) * this.#m;
		if (lo === hi) return;
		const mid = (lo + hi) >> 1;
		this.#build(2 * node, lo, mid);
		this.#build(2 * node + 1, mid + 1, hi);
	}

	#firstWithRoom(node: number, lo: number, hi: number, k: number): number {
		if ((this.#most[node] ?? 0) < k) return -1;
		if (lo === hi) return lo;
		const mid = (lo + hi) >> 1;
		const left = this.#firstWithRoom(2 * node, lo, mid, k);
		return left !== -1
			? left
			: this.#firstWithRoom(2 * node + 1, mid + 1, hi, k);
	}

	#freeUpTo(node: number, lo: number, hi: number, maxRow: number): number {
		if (lo > maxRow) return 0;
		if (hi <= maxRow) return this.#free[node] ?? 0;
		const mid = (lo + hi) >> 1;
		return (
			this.#freeUpTo(2 * node, lo, mid, maxRow) +
			this.#freeUpTo(2 * node + 1, mid + 1, hi, maxRow)
		);
	}

	#freeIn(row: number): number {
		let [node, lo, hi] = [1, 0, this.#n - 1];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (row <= mid) [node, hi] = [2 * node, mid];
			else [node, lo] = [2 * node + 1, mid + 1];
		}
		return this.#free[node] ?? 0;
	}

	#take(row: number, seats: number): void {
		const path: number[] = [];
		let [node, lo, hi] = [1, 0, this.#n - 1];
		while (lo < hi) {
			path.push(node);
			const mid = (lo + hi) >> 1;
			if (row <= mid) [node, hi] = [2 * node, mid];
			else [node, lo] = [2 * node + 1, mid + 1];
		}
		this.#free[node] = (this.#free[node] ?? 0) - seats;
		this.#most[node] = this.#free[node] ?? 0;
		for (const parent of path.reverse()) {
			const [left, right] = [2 * parent, 2 * parent + 1];
			this.#free[parent] = (this.#free[left] ?? 0) + (this.#free[right] ?? 0);
			this.#most[parent] = Math.max(
				this.#most[left] ?? 0,
				this.#most[right] ?? 0,
			);
		}
	}
}
