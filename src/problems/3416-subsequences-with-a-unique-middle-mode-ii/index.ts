const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const choose2 = (n: number): number => (n * (n - 1)) / 2;
const reduce = (x: number): number => ((x % MOD) + MOD) % MOD;

/**
 * 3416. Subsequences with a Unique Middle Mode II
 *
 * Count the length-5 subsequences whose middle element is their only most
 * frequent value, modulo 10⁹ + 7, for arrays up to 10⁵ long.
 *
 * Fix the middle index, with value x. Picking two more copies of x from
 * either side always works; picking exactly one more works only when the
 * other three are distinct values, and no more never does. The distinct
 * case needs sums over every other value v of terms built from its counts
 * on the left and right, like C(right_v, 2) and left_v · right_v². Keep
 * those sums over all values up to date as the middle moves, and subtract
 * x's own terms, so each middle takes O(1).
 *
 * @see https://leetcode.com/problems/subsequences-with-a-unique-middle-mode-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * subsequencesWithAUniqueMiddleModeII([1, 2, 2, 3, 3, 4]); // 4
 */
export const subsequencesWithAUniqueMiddleModeII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const left = new Map<number, number>();
	const right = new Map<number, number>();
	for (const num of nums) right.set(num, (right.get(num) ?? 0) + 1);
	// Sums over all values of C(r, 2), C(l, 2), l·r, l·r² and l²·r.
	let rightPairs = 0;
	for (const count of right.values()) rightPairs += choose2(count);
	let leftPairs = 0;
	let lr = 0;
	let lrr = 0;
	let llr = 0;
	const terms = (
		l: number,
		r: number,
	): [number, number, number, number, number] => [
		choose2(r),
		choose2(l),
		l * r,
		l * r * r,
		l * l * r,
	];
	const update = (l: number, r: number, sign: number): void => {
		const [a, b, c, d, e] = terms(l, r);
		rightPairs += sign * a;
		leftPairs += sign * b;
		lr += sign * c;
		lrr += sign * d;
		llr += sign * e;
	};
	const pick = [() => 1, (c: number) => c, (c: number) => choose2(c)];
	let total = 0;
	nums.forEach((x, i) => {
		const lx = left.get(x) ?? 0;
		const rxBefore = right.get(x) ?? 0;
		update(lx, rxBefore, -1);
		const rx = rxBefore - 1;
		right.set(x, rx);
		const lo = i - lx;
		const ro = n - 1 - i - rx;
		for (let a = 0; a <= 2; a++)
			for (let b = 2 - a; b <= 2; b++) {
				const ways = multiply(
					multiply(reduce(pick[a]?.(lx) ?? 0), reduce(pick[2 - a]?.(lo) ?? 0)),
					multiply(reduce(pick[b]?.(rx) ?? 0), reduce(pick[2 - b]?.(ro) ?? 0)),
				);
				total = (total + ways) % MOD;
			}
		// Sums over values other than x (x's own terms were just removed).
		const oneLeft = lo * (choose2(ro) - rightPairs) - (ro * lr - lrr);
		const oneRight = ro * (choose2(lo) - leftPairs) - (lo * lr - llr);
		total =
			(total + multiply(lx, reduce(oneLeft)) + multiply(rx, reduce(oneRight))) %
			MOD;
		left.set(x, lx + 1);
		update(lx + 1, rx, 1);
	});
	return total;
};
