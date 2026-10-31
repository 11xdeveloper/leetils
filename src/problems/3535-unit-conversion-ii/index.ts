const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	let b = base % MOD;
	for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
		if (e % 2 === 1) result = multiply(result, b);
		b = multiply(b, b);
	}
	return result;
};

/**
 * 3535. Unit Conversion II
 *
 * Conversions `[source, target, factor]` form a tree from unit 0: one source unit is `factor` target units. Returns, for each query `[a, b]`, how many units of b make one unit of a, modulo 10⁹ + 7.
 *
 * Find each unit's amount per unit 0 by walking the tree, then divide using modular inverses.
 *
 * @see https://leetcode.com/problems/unit-conversion-ii/
 * @difficulty Medium
 * @timeComplexity O(n + q log MOD)
 * @spaceComplexity O(n)
 *
 * @example
 * unitConversionII([[0, 1, 2], [0, 2, 6]], [[1, 2], [1, 0]]); // [3, 500000004]
 */
export const unitConversionII = (
	conversions: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
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
	return queries.map(([a = 0, b = 0]) =>
		multiply(amount[b] ?? 0, power(amount[a] ?? 1, MOD - 2)),
	);
};
