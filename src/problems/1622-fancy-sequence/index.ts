const MOD = 1_000_000_007;

/** `(a · b) mod MOD` without losing precision, by splitting `b` in two. */
const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let [result, square, rest] = [1, base, exponent];
	for (; rest > 0; rest = Math.floor(rest / 2)) {
		if (rest % 2 === 1) result = multiply(result, square);
		square = multiply(square, square);
	}
	return result;
};

/**
 * 1622. Fancy Sequence
 *
 * A sequence supporting `append(val)`, `addAll(inc)`, `multAll(m)` and
 * `getIndex(idx)` (modulo 10^9 + 7, or -1 past the end).
 *
 * Keeps one affine map `x ↦ a·x + b` applied to every stored value. A new
 * value is stored as the preimage `(val − b) / a` (dividing by a modular
 * inverse), so the current map gives back exactly `val`; later updates
 * just change `a` and `b`.
 *
 * @see https://leetcode.com/problems/fancy-sequence/
 * @difficulty Hard
 * @timeComplexity O(log MOD) per append, O(1) otherwise
 * @spaceComplexity O(n)
 *
 * @example
 * const fancy = new FancySequence();
 * fancy.append(2);
 * fancy.addAll(3);
 * fancy.multAll(2);
 * fancy.getIndex(0); // 10
 */
export class FancySequence {
	readonly #stored: number[] = [];
	#scale = 1;
	#shift = 0;

	append(val: number): void {
		const inverse = power(this.#scale, MOD - 2);
		this.#stored.push(multiply((val - this.#shift + MOD) % MOD, inverse));
	}

	addAll(inc: number): void {
		this.#shift = (this.#shift + inc) % MOD;
	}

	multAll(m: number): void {
		this.#scale = multiply(this.#scale, m);
		this.#shift = multiply(this.#shift, m);
	}

	getIndex(idx: number): number {
		const stored = this.#stored[idx];
		if (stored === undefined) return -1;
		return (multiply(stored, this.#scale) + this.#shift) % MOD;
	}
}
