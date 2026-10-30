/**
 * 2166. Design Bitset
 *
 * A fixed-size bitset supporting setting and clearing bits, flipping all
 * bits, and querying whether all or any are set, the count, and its
 * string form.
 *
 * Store the bits with a lazy "flipped" flag and a count of set bits, so
 * flipping is constant time.
 *
 * @see https://leetcode.com/problems/design-bitset/
 * @difficulty Medium
 * @timeComplexity O(1) per operation, O(n) for toString
 * @spaceComplexity O(n)
 *
 * @example
 * const bitset = new DesignBitset(5);
 * bitset.fix(3);
 * bitset.fix(1);
 * bitset.flip();
 * bitset.toString(); // "10101"
 */
export class DesignBitset {
	readonly #bits: Uint8Array;
	#flipped = false;
	#ones = 0;

	constructor(size: number) {
		this.#bits = new Uint8Array(size);
	}

	fix(idx: number): void {
		if (this.#get(idx)) return;
		this.#bits[idx] = this.#flipped ? 0 : 1;
		this.#ones++;
	}

	unfix(idx: number): void {
		if (!this.#get(idx)) return;
		this.#bits[idx] = this.#flipped ? 1 : 0;
		this.#ones--;
	}

	flip(): void {
		this.#flipped = !this.#flipped;
		this.#ones = this.#bits.length - this.#ones;
	}

	all(): boolean {
		return this.#ones === this.#bits.length;
	}

	one(): boolean {
		return this.#ones > 0;
	}

	count(): number {
		return this.#ones;
	}

	toString(): string {
		return Array.from(this.#bits, (_, i) => (this.#get(i) ? "1" : "0")).join(
			"",
		);
	}

	#get(idx: number): boolean {
		return (this.#bits[idx] === 1) !== this.#flipped;
	}
}
