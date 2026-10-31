const gcd = (a: number, b: number): number => {
	let [x, y] = [a, b];
	while (y) [x, y] = [y, x % y];
	return x;
};

/**
 * 3444. Minimum Increments for Target Multiples in an Array
 *
 * The fewest increments to elements of `nums` so that every value in
 * `target` (at most four) has a multiple in `nums`.
 *
 * An element can cover a set of targets by rising to a multiple of their
 * LCM. Bitmask dynamic programming over the elements and the targets
 * covered so far.
 *
 * @see https://leetcode.com/problems/minimum-increments-for-target-multiples-in-an-array/
 * @difficulty Hard
 * @timeComplexity O(n · 3^t), for t targets
 * @spaceComplexity O(2^t)
 *
 * @example
 * minimumIncrementsForTargetMultiplesInAnArray([1, 2, 3], [4]); // 1
 */
export const minimumIncrementsForTargetMultiplesInAnArray = (
	nums: readonly number[],
	target: readonly number[],
): number => {
	const t = target.length;
	const full = (1 << t) - 1;
	const lcm = new Float64Array(1 << t).fill(1);
	for (let mask = 1; mask <= full; mask++) {
		const low = 31 - Math.clz32(mask & -mask);
		const rest = lcm[mask & (mask - 1)] ?? 1;
		const value = target[low] ?? 1;
		lcm[mask] = (rest / gcd(rest, value)) * value;
	}
	let best = new Float64Array(1 << t).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (const num of nums) {
		const next = Float64Array.from(best);
		for (let have = 0; have <= full; have++) {
			const current = best[have] ?? Number.POSITIVE_INFINITY;
			if (current === Number.POSITIVE_INFINITY) continue;
			const missing = full & ~have;
			for (let add = missing; add > 0; add = (add - 1) & missing) {
				const l = lcm[add] ?? 1;
				const cost = Math.ceil(num / l) * l - num;
				const covered = have | add;
				next[covered] = Math.min(next[covered] ?? 0, current + cost);
			}
		}
		best = next;
	}
	return best[full] ?? 0;
};
