/**
 * 3549. Multiply Two Polynomials
 *
 * The coefficients of the product of two polynomials, given by their
 * coefficients from the constant term up.
 *
 * Multiply with a fast Fourier transform: transform both, multiply
 * pointwise, transform back and round. Coefficients and lengths are small
 * enough that double precision rounds exactly.
 *
 * @see https://leetcode.com/problems/multiply-two-polynomials/
 * @difficulty Hard
 * @timeComplexity O((n + m) log(n + m))
 * @spaceComplexity O(n + m)
 *
 * @example
 * multiplyTwoPolynomials([3, 2, 5], [1, 4]); // [3, 14, 13, 20]
 */
export const multiplyTwoPolynomials = (
	poly1: readonly number[],
	poly2: readonly number[],
): number[] => {
	const length = poly1.length + poly2.length - 1;
	let size = 1;
	while (size < length) size *= 2;
	const transform = (
		re: Float64Array,
		im: Float64Array,
		invert: boolean,
	): void => {
		for (let i = 1, j = 0; i < size; i++) {
			let bit = size >> 1;
			for (; j & bit; bit >>= 1) j ^= bit;
			j ^= bit;
			if (i < j) {
				[re[i], re[j]] = [re[j] ?? 0, re[i] ?? 0];
				[im[i], im[j]] = [im[j] ?? 0, im[i] ?? 0];
			}
		}
		for (let len = 2; len <= size; len *= 2) {
			const angle = ((invert ? -2 : 2) * Math.PI) / len;
			const [wr, wi] = [Math.cos(angle), Math.sin(angle)];
			for (let start = 0; start < size; start += len) {
				let [cr, ci] = [1, 0];
				for (let k = 0; k < len / 2; k++) {
					const a = start + k;
					const b = a + len / 2;
					const tr = (re[b] ?? 0) * cr - (im[b] ?? 0) * ci;
					const ti = (re[b] ?? 0) * ci + (im[b] ?? 0) * cr;
					re[b] = (re[a] ?? 0) - tr;
					im[b] = (im[a] ?? 0) - ti;
					re[a] = (re[a] ?? 0) + tr;
					im[a] = (im[a] ?? 0) + ti;
					[cr, ci] = [cr * wr - ci * wi, cr * wi + ci * wr];
				}
			}
		}
		if (invert)
			for (let i = 0; i < size; i++) {
				re[i] = (re[i] ?? 0) / size;
				im[i] = (im[i] ?? 0) / size;
			}
	};
	const [ar, ai, br, bi] = [
		new Float64Array(size),
		new Float64Array(size),
		new Float64Array(size),
		new Float64Array(size),
	];
	ar.set(poly1);
	br.set(poly2);
	transform(ar, ai, false);
	transform(br, bi, false);
	for (let i = 0; i < size; i++) {
		const [x, y] = [ar[i] ?? 0, ai[i] ?? 0];
		ar[i] = x * (br[i] ?? 0) - y * (bi[i] ?? 0);
		ai[i] = x * (bi[i] ?? 0) + y * (br[i] ?? 0);
	}
	transform(ar, ai, true);
	return Array.from({ length }, (_, i) => Math.round(ar[i] ?? 0) + 0);
};
