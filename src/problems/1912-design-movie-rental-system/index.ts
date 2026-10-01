import { Heap } from "../../internal/heap";

/** A copy of a movie at a shop, with a version bumped whenever its state changes. */
interface Copy {
	shop: number;
	movie: number;
	price: number;
	rented: boolean;
	version: number;
}

type Entry = readonly [copy: Copy, version: number];

const byPrice = ([a]: Entry, [b]: Entry) =>
	a.price - b.price || a.shop - b.shop || a.movie - b.movie;

/**
 * 1912. Design Movie Rental System
 *
 * Shops hold copies `[shop, movie, price]`. Supports searching the five
 * cheapest shops with an unrented copy of a movie, renting, dropping off,
 * and reporting the five cheapest rented copies.
 *
 * A heap of unrented copies per movie and a heap of rented copies, with
 * lazy deletion: each heap entry records the copy's version when pushed,
 * and stale entries are skipped. Queries pop up to five live entries and
 * push them back.
 *
 * @see https://leetcode.com/problems/design-movie-rental-system/
 * @difficulty Hard
 * @timeComplexity O(log n) amortized per operation
 * @spaceComplexity O(n + operations)
 *
 * @example
 * const system = new DesignMovieRentalSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
 * system.search(1); // [1, 0, 2]
 */
export class DesignMovieRentalSystem {
	readonly #copies = new Map<string, Copy>();
	readonly #unrented = new Map<number, Heap<Entry>>();
	readonly #rented = new Heap<Entry>(byPrice);

	constructor(_n: number, entries: readonly (readonly number[])[]) {
		for (const [shop = 0, movie = 0, price = 0] of entries) {
			const copy: Copy = { shop, movie, price, rented: false, version: 0 };
			this.#copies.set(`${shop},${movie}`, copy);
			this.#heapFor(movie).push([copy, 0]);
		}
	}

	search(movie: number): number[] {
		return DesignMovieRentalSystem.#cheapest(this.#heapFor(movie), false).map(
			({ shop }) => shop,
		);
	}

	rent(shop: number, movie: number): void {
		const copy = this.#copies.get(`${shop},${movie}`);
		if (!copy) return;
		copy.rented = true;
		copy.version++;
		this.#rented.push([copy, copy.version]);
	}

	drop(shop: number, movie: number): void {
		const copy = this.#copies.get(`${shop},${movie}`);
		if (!copy) return;
		copy.rented = false;
		copy.version++;
		this.#heapFor(movie).push([copy, copy.version]);
	}

	report(): number[][] {
		return DesignMovieRentalSystem.#cheapest(this.#rented, true).map(
			({ shop, movie }) => [shop, movie],
		);
	}

	#heapFor(movie: number): Heap<Entry> {
		let heap = this.#unrented.get(movie);
		if (!heap) {
			heap = new Heap<Entry>(byPrice);
			this.#unrented.set(movie, heap);
		}
		return heap;
	}

	/** The (up to) five cheapest live copies in `heap`, which keeps them. */
	static #cheapest(heap: Heap<Entry>, rented: boolean): Copy[] {
		const live: Entry[] = [];
		while (live.length < 5) {
			const entry = heap.pop();
			if (!entry) break;
			const [copy, version] = entry;
			if (copy.version === version && copy.rented === rented) live.push(entry);
		}
		for (const entry of live) heap.push(entry);
		return live.map(([copy]) => copy);
	}
}
