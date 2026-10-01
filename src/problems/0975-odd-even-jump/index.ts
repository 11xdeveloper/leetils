/**
 * 975. Odd Even Jump
 *
 * From index `i`, odd-numbered jumps go to the smallest value at least
 * `arr[i]` further right, and even-numbered jumps to the largest value at
 * most `arr[i]` (ties go to the smallest index). Counts the starting
 * indices from which alternating jumps, odd first, reach the end.
 *
 * Each index's odd and even jump target is found with a monotonic stack
 * over indices sorted by value (ascending, or descending for even jumps).
 * Working backwards, an index succeeds on an odd jump if its target
 * succeeds on an even one, and vice versa.
 *
 * @see https://leetcode.com/problems/odd-even-jump/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * oddEvenJump([10, 13, 12, 14, 15]); // 2
 */
export const oddEvenJump = (arr: readonly number[]): number => {
	const n = arr.length;
	const targets = (order: number[]): number[] => {
		const next = new Array<number>(n).fill(-1);
		const stack: number[] = [];
		for (const i of order) {
			while (stack.length > 0 && (stack.at(-1) ?? 0) < i)
				next[stack.pop() ?? 0] = i;
			stack.push(i);
		}
		return next;
	};
	const indices = Array.from({ length: n }, (_, i) => i);
	const oddNext = targets(
		indices.toSorted((a, b) => (arr[a] ?? 0) - (arr[b] ?? 0) || a - b),
	);
	const evenNext = targets(
		indices.toSorted((a, b) => (arr[b] ?? 0) - (arr[a] ?? 0) || a - b),
	);

	const odd = new Array<boolean>(n).fill(false);
	const even = new Array<boolean>(n).fill(false);
	odd[n - 1] = true;
	even[n - 1] = true;
	let count = 1;
	for (let i = n - 2; i >= 0; i--) {
		odd[i] = (oddNext[i] ?? -1) >= 0 && (even[oddNext[i] ?? 0] ?? false);
		even[i] = (evenNext[i] ?? -1) >= 0 && (odd[evenNext[i] ?? 0] ?? false);
		if (odd[i]) count++;
	}
	return count;
};
