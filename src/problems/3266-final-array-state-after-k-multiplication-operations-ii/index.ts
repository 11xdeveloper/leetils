import { Heap } from "../../internal/heap";

const MOD = 1_000_000_007n;

/**
 * 3266. Final Array State After K Multiplication Operations II
 *
 * `k` times, multiply the smallest element of `nums` (the first, on a tie)
 * by `multiplier`. Returns the final array modulo 10⁹ + 7, for `k` up to
 * 10⁹.
 *
 * Simulate with a heap until even the smallest element, once multiplied,
 * would pass the largest. From then on the operations go round the
 * elements in sorted order, so each gets ⌊k / n⌋ more, and the smallest
 * k mod n one extra. Finish with modular powers.
 *
 * @see https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n · log max)
 * @spaceComplexity O(n)
 *
 * @example
 * finalArrayStateAfterKMultiplicationOperationsII([2, 1, 3, 5, 6], 5, 2); // [8, 4, 6, 5, 6]
 */
export const finalArrayStateAfterKMultiplicationOperationsII = (
	nums: readonly number[],
	k: number,
	multiplier: number,
): number[] => {
	if (multiplier === 1) return [...nums];
	const n = nums.length;
	const values = [...nums];
	const max = Math.max(...nums);
	const before = (a: number, b: number): number =>
		(values[a] ?? 0) - (values[b] ?? 0) || a - b;
	const heap = new Heap<number>(
		before,
		values.map((_, i) => i),
	);
	let left = k;
	for (
		let top = heap.peek();
		left > 0 && top !== undefined && (values[top] ?? 0) * multiplier <= max;
		top = heap.peek()
	) {
		heap.pop();
		values[top] = (values[top] ?? 0) * multiplier;
		heap.push(top);
		left--;
	}
	const order = values.map((_, i) => i).sort(before);
	const power = (exponent: number): bigint => {
		let result = 1n;
		let base = BigInt(multiplier) % MOD;
		for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
			if (e % 2 === 1) result = (result * base) % MOD;
			base = (base * base) % MOD;
		}
		return result;
	};
	const each = Math.floor(left / n);
	const extra = left % n;
	const result = new Array<number>(n);
	order.forEach((index, rank) => {
		const times = each + (rank < extra ? 1 : 0);
		result[index] = Number(
			((BigInt(values[index] ?? 0) % MOD) * power(times)) % MOD,
		);
	});
	return result;
};
