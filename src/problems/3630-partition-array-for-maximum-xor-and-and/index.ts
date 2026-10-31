/**
 * 3630. Partition Array for Maximum XOR and AND
 *
 * Split `nums` (up to 19 numbers) into groups A, B and C, any of them
 * empty, maximising XOR(A) + AND(B) + XOR(C), where an empty group counts
 * as 0. Returns that maximum.
 *
 * Try every B. The rest have a fixed XOR X, and XOR(A) + XOR(C) is
 * X + 2 · (XOR(A) without X's bits); the best XOR(A) there comes from a
 * linear basis of the remaining numbers with X's bits cleared.
 *
 * @see https://leetcode.com/problems/partition-array-for-maximum-xor-and-and/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · n · log V)
 * @spaceComplexity O(n + log V)
 *
 * @example
 * partitionArrayForMaximumXorAndAnd([2, 3, 6, 7]); // 15
 */
export const partitionArrayForMaximumXorAndAnd = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const full = (1 << n) - 1;
	const xors = new Int32Array(1 << n);
	const ands = new Int32Array(1 << n);
	for (let mask = 1; mask <= full; mask++) {
		const low = 31 - Math.clz32(mask & -mask);
		const rest = mask & (mask - 1);
		xors[mask] = (xors[rest] ?? 0) ^ (nums[low] ?? 0);
		ands[mask] =
			rest === 0 ? (nums[low] ?? 0) : (ands[rest] ?? 0) & (nums[low] ?? 0);
	}
	const basis = new Int32Array(31);
	let best = 0;
	for (let group = 0; group <= full; group++) {
		const others = full ^ group;
		const total = xors[others] ?? 0;
		basis.fill(0);
		for (let m = others; m; m &= m - 1) {
			let value = (nums[31 - Math.clz32(m & -m)] ?? 0) & ~total;
			for (let bit = 30; bit >= 0 && value; bit--) {
				if (!((value >> bit) & 1)) continue;
				const row = basis[bit] ?? 0;
				if (row === 0) {
					basis[bit] = value;
					value = 0;
				} else value ^= row;
			}
		}
		let most = 0;
		for (let bit = 30; bit >= 0; bit--)
			most = Math.max(most, most ^ (basis[bit] ?? 0));
		best = Math.max(best, (ands[group] ?? 0) + total + 2 * most);
	}
	return best;
};
