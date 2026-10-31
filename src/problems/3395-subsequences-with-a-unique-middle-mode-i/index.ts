const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const choose2 = (n: number): number => (n * (n - 1)) / 2;

/**
 * 3395. Subsequences with a Unique Middle Mode I
 *
 * Count the length-5 subsequences whose middle element is their only most
 * frequent value, modulo 10⁹ + 7.
 *
 * Fix the middle index, with value x. Picking two more copies of x from
 * either side always works. Picking exactly one more works only if the
 * other three elements are all different values: count the choices of one
 * from one side and two from the other, then subtract those where a value
 * repeats, using per-value counts on each side. With no other copy of x it
 * never works.
 *
 * @see https://leetcode.com/problems/subsequences-with-a-unique-middle-mode-i/
 * @difficulty Hard
 * @timeComplexity O(n · d), for d distinct values
 * @spaceComplexity O(d)
 *
 * @example
 * subsequencesWithAUniqueMiddleModeI([1, 2, 2, 3, 3, 4]); // 4
 */
export const subsequencesWithAUniqueMiddleModeI = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const left = new Map<number, number>();
	const right = new Map<number, number>();
	for (const num of nums) right.set(num, (right.get(num) ?? 0) + 1);
	const pick = [() => 1, (c: number) => c, (c: number) => choose2(c)];
	let total = 0;
	nums.forEach((x, i) => {
		right.set(x, (right.get(x) ?? 0) - 1);
		const lx = left.get(x) ?? 0;
		const rx = right.get(x) ?? 0;
		const lo = i - lx;
		const ro = n - 1 - i - rx;
		for (let a = 0; a <= 2; a++)
			for (let b = 0; b <= 2; b++) {
				if (a + b < 2) continue;
				const ways = multiply(
					multiply(pick[a]?.(lx) ?? 0, pick[2 - a]?.(lo) ?? 0),
					multiply(pick[b]?.(rx) ?? 0, pick[2 - b]?.(ro) ?? 0),
				);
				total = (total + ways) % MOD;
			}
		// Exactly one more x: the three others must be distinct values.
		let leftPairsSame = 0;
		let rightPairsSame = 0;
		let leftOverlap = 0;
		let rightOverlap = 0;
		for (const [value, count] of right) {
			if (value === x) continue;
			const l = left.get(value) ?? 0;
			rightPairsSame += choose2(count);
			leftOverlap += l * count * (ro - count);
			rightOverlap += count * l * (lo - l);
		}
		for (const [value, count] of left)
			if (value !== x) leftPairsSame += choose2(count);
		const oneLeft = (lo * (choose2(ro) - rightPairsSame) - leftOverlap) % MOD;
		const oneRight = (ro * (choose2(lo) - leftPairsSame) - rightOverlap) % MOD;
		total =
			(total +
				multiply(lx, (oneLeft + MOD) % MOD) +
				multiply(rx, (oneRight + MOD) % MOD)) %
			MOD;
		left.set(x, lx + 1);
	});
	return total;
};
