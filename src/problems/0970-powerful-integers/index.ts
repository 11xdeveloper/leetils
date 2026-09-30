/**
 * 970. Powerful Integers
 *
 * Returns every distinct value `x^i + y^j` (for non-negative `i`, `j`) that
 * is at most `bound`, in increasing order here, though any order is
 * accepted.
 *
 * Enumerates powers of each base up to `bound`; a base of 1 has only the
 * power 1.
 *
 * @see https://leetcode.com/problems/powerful-integers/
 * @difficulty Medium
 * @timeComplexity O(log^2 bound)
 * @spaceComplexity O(log^2 bound)
 *
 * @example
 * powerfulIntegers(2, 3, 10); // [2, 3, 4, 5, 7, 9, 10]
 */
export const powerfulIntegers = (
	x: number,
	y: number,
	bound: number,
): number[] => {
	const powers = (base: number): number[] => {
		const result = [1];
		if (base === 1) return result;
		for (let power = base; power <= bound; power *= base) result.push(power);
		return result;
	};
	const values = new Set<number>();
	for (const a of powers(x))
		for (const b of powers(y)) if (a + b <= bound) values.add(a + b);
	return [...values].sort((a, b) => a - b);
};
