const MOD = 1_000_000_007;

/**
 * 3575. Maximum Good Subtree Score
 *
 * In a tree rooted at 0, a subtree's score is the largest sum of a set of
 * its values whose decimal digits, taken together, never repeat. Returns
 * the sum of every node's subtree score, modulo 1e9+7.
 *
 * Each usable value is a set of digits, a 10-bit mask. For each subtree,
 * keep the best sum for every mask, merging children by combining disjoint
 * masks (each merge enumerates submasks, 3¹⁰ steps).
 *
 * @see https://leetcode.com/problems/maximum-good-subtree-score/
 * @difficulty Hard
 * @timeComplexity O(n · 3¹⁰)
 * @spaceComplexity O(n · 2¹⁰)
 *
 * @example
 * maximumGoodSubtreeScore([2, 3], [-1, 0]); // 8
 */
export const maximumGoodSubtreeScore = (
	vals: readonly number[],
	par: readonly number[],
): number => {
	const n = vals.length;
	const FULL = 1 << 10;
	const NONE = -1;
	const children: number[][] = Array.from({ length: n }, () => []);
	par.forEach((p, i) => {
		if (p >= 0) children[p]?.push(i);
	});
	const maskOf = (value: number): number => {
		let mask = 0;
		for (const digit of String(value)) {
			const bit = 1 << Number(digit);
			if (mask & bit) return -1;
			mask |= bit;
		}
		return mask;
	};
	const merge = (a: Float64Array, b: Float64Array): Float64Array => {
		const result = Float64Array.from(a);
		for (let x = 0; x < FULL; x++) {
			const left = a[x] ?? NONE;
			if (left === NONE) continue;
			const rest = FULL - 1 - x;
			for (let y = rest; ; y = (y - 1) & rest) {
				const right = b[y] ?? NONE;
				if (right !== NONE && left + right > (result[x | y] ?? NONE))
					result[x | y] = left + right;
				if (y === 0) break;
			}
		}
		return result;
	};
	const order = [0];
	for (let i = 0; i < order.length; i++)
		order.push(...(children[order[i] ?? 0] ?? []));
	const tables: Float64Array[] = new Array(n);
	let total = 0;
	for (let i = n - 1; i >= 0; i--) {
		const v = order[i] ?? 0;
		let table: Float64Array = new Float64Array(FULL).fill(NONE);
		table[0] = 0;
		const own = maskOf(vals[v] ?? 0);
		if (own >= 0) table[own] = vals[v] ?? 0;
		for (const child of children[v] ?? []) {
			const childTable = tables[child];
			if (childTable) table = merge(table, childTable);
		}
		tables[v] = table;
		total = (total + (Math.max(...table) % MOD)) % MOD;
	}
	return total;
};
