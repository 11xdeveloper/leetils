const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3528. Unit Conversion I
 *
 * Conversions `[source, target, factor]` form a tree from unit 0: one source unit is `factor` target units. Returns how many of each unit make one unit 0, modulo 10⁹ + 7.
 *
 * Walk the tree from unit 0, multiplying factors.
 *
 * @see https://leetcode.com/problems/unit-conversion-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * unitConversionI([[0, 1, 2], [1, 2, 3]]); // [1, 2, 6]
 */
export const unitConversionI = (
	conversions: readonly (readonly number[])[],
): number[] => {
	const n = conversions.length + 1;
	const children: [target: number, factor: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [source = 0, target = 0, factor = 0] of conversions)
		children[source]?.push([target, factor]);
	const amount = new Array<number>(n).fill(0);
	amount[0] = 1;
	const stack = [0];
	for (let unit = stack.pop(); unit !== undefined; unit = stack.pop())
		for (const [target, factor] of children[unit] ?? []) {
			amount[target] = multiply(amount[unit] ?? 0, factor);
			stack.push(target);
		}
	return amount;
};
