const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3539. Find Sum of Array Product of Magical Sequences
 *
 * A sequence of `m` indices into `nums` is magical if Σ 2^index has exactly
 * `k` set bits. Returns the total, over all magical sequences, of the
 * product of `nums` at their indices, modulo 10⁹ + 7.
 *
 * Decide how many times c each index is used, from the lowest up: that
 * adds c to the running carry, fixes one bit of the sum, and contributes
 * nums[i]^c / c! (the orders are counted by m! at the end). Dynamic
 * programming over (indices used, carry, set bits so far).
 *
 * @see https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences/
 * @difficulty Hard
 * @timeComplexity O(n · m³ · k)
 * @spaceComplexity O(m² · k)
 *
 * @example
 * findSumOfArrayProductOfMagicalSequences(5, 5, [1, 10, 100, 10000, 1000000]); // 991600007
 */
export const findSumOfArrayProductOfMagicalSequences = (
	m: number,
	k: number,
	nums: readonly number[],
): number => {
	const factorial = [1];
	for (let i = 1; i <= m; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	const power = (base: number, exponent: number): number => {
		let result = 1;
		let b = base % MOD;
		for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
			if (e % 2 === 1) result = multiply(result, b);
			b = multiply(b, b);
		}
		return result;
	};
	const inverse = factorial.map((f) => power(f, MOD - 2));
	const at = (used: number, carry: number, bits: number): number =>
		(used * (m + 1) + carry) * (k + 1) + bits;
	let ways = new Float64Array((m + 1) * (m + 1) * (k + 1));
	ways[at(0, 0, 0)] = 1;
	for (const num of nums) {
		const powers = [1];
		for (let c = 1; c <= m; c++)
			powers.push(multiply(powers[c - 1] ?? 1, num % MOD));
		const next = new Float64Array(ways.length);
		for (let used = 0; used <= m; used++)
			for (let carry = 0; carry <= m; carry++)
				for (let bits = 0; bits <= k; bits++) {
					const current = ways[at(used, carry, bits)] ?? 0;
					if (current === 0) continue;
					for (let c = 0; used + c <= m; c++) {
						const total = carry + c;
						const newBits = bits + (total & 1);
						if (newBits > k) continue;
						const weight = multiply(powers[c] ?? 1, inverse[c] ?? 1);
						const slot = at(used + c, total >> 1, newBits);
						next[slot] = ((next[slot] ?? 0) + multiply(current, weight)) % MOD;
					}
				}
		ways = next;
	}
	let total = 0;
	for (let carry = 0; carry <= m; carry++) {
		let carryBits = 0;
		for (let c = carry; c; c &= c - 1) carryBits++;
		for (let bits = 0; bits <= k; bits++)
			if (bits + carryBits === k)
				total = (total + (ways[at(m, carry, bits)] ?? 0)) % MOD;
	}
	return multiply(total, factorial[m] ?? 1);
};
