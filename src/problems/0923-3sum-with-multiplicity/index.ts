/**
 * 923. 3Sum With Multiplicity
 *
 * Counts the index triples `i < j < k` with `arr[i] + arr[j] + arr[k]`
 * equal to `target`, modulo 10^9 + 7. Values are between 0 and 100.
 *
 * Counts each value, then goes over value triples `a ≤ b ≤ c` summing to
 * the target, choosing indices from the counts (with the right binomial
 * coefficient when values repeat).
 *
 * @see https://leetcode.com/problems/3sum-with-multiplicity/
 * @difficulty Medium
 * @timeComplexity O(n + 101^2)
 * @spaceComplexity O(101)
 *
 * @example
 * threeSumWithMultiplicity([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8); // 20
 */
export const threeSumWithMultiplicity = (
	arr: readonly number[],
	target: number,
): number => {
	const counts = new Array<number>(101).fill(0);
	for (const value of arr) counts[value] = (counts[value] ?? 0) + 1;

	let total = 0;
	for (let a = 0; a <= 100; a++) {
		for (let b = a; b <= 100; b++) {
			const c = target - a - b;
			if (c < b || c > 100) continue;
			const [ca, cb, cc] = [counts[a] ?? 0, counts[b] ?? 0, counts[c] ?? 0];
			if (a === b && b === c) total += (ca * (ca - 1) * (ca - 2)) / 6;
			else if (a === b) total += ((ca * (ca - 1)) / 2) * cc;
			else if (b === c) total += ca * ((cb * (cb - 1)) / 2);
			else total += ca * cb * cc;
		}
	}
	return total % 1_000_000_007;
};
