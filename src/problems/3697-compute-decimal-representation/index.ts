/**
 * 3697. Compute Decimal Representation
 *
 * Writes `n` as a sum of its non-zero digits times their place values,
 * largest first.
 *
 * @see https://leetcode.com/problems/compute-decimal-representation/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * computeDecimalRepresentation(537); // [500, 30, 7]
 */
export const computeDecimalRepresentation = (n: number): number[] => {
	const digits = String(n);
	return [...digits].flatMap((d, i) =>
		d === "0" ? [] : [Number(d) * 10 ** (digits.length - 1 - i)],
	);
};
