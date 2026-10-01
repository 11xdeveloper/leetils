const gcd = (a: number, b: number): number => {
	let [x, y] = [a, b];
	while (y > 0) [x, y] = [y, x % y];
	return x;
};

/**
 * 1625. Lexicographically Smallest String After Applying Operations
 *
 * The digit string `s` (even length) can repeatedly have `a` added to every
 * odd index (mod 10), or be rotated right by `b`. Returns the smallest
 * string reachable.
 *
 * The operations commute up to which digits they shift, so a reachable
 * string is fixed by: a rotation (any multiple of `gcd(b, n)`), how much was
 * added to the digits now at odd indices (0–9 times `a`), and, only when
 * the rotation step is odd, how much was added to those now at even
 * indices. Try every combination.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations/
 * @difficulty Medium
 * @timeComplexity O(n^2 · 100)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterApplyingOperations("5525", 9, 2); // "2050"
 */
export const lexicographicallySmallestStringAfterApplyingOperations = (
	s: string,
	a: number,
	b: number,
): string => {
	const n = s.length;
	const step = gcd(b, n);
	let best = s;
	for (let shift = 0; shift < n; shift += step) {
		const rotated = s.slice(n - shift) + s.slice(0, n - shift);
		for (let odd = 0; odd < 10; odd++) {
			for (let even = 0; even < (step % 2 === 1 ? 10 : 1); even++) {
				const digits = [...rotated].map(
					(digit, i) => (Number(digit) + (i % 2 === 1 ? odd : even) * a) % 10,
				);
				const candidate = digits.join("");
				if (candidate < best) best = candidate;
			}
		}
	}
	return best;
};
