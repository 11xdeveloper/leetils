/**
 * 264. Ugly Number II
 *
 * Returns the `n`th ugly number: the `n`th positive integer whose only prime
 * factors are 2, 3 and 5, counting 1 as the first.
 *
 * Every ugly number after 1 is a smaller ugly number times 2, 3 or 5. Builds
 * them in order with one pointer per factor into the list so far; each step
 * takes the smallest of the three candidates and advances every pointer
 * that produced it, so duplicates like 6 = 2 × 3 = 3 × 2 appear once.
 *
 * @see https://leetcode.com/problems/ugly-number-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * uglyNumberII(10); // 12: the sequence starts 1, 2, 3, 4, 5, 6, 8, 9, 10, 12
 */
export const uglyNumberII = (n: number): number => {
	const ugly = [1];
	let i2 = 0;
	let i3 = 0;
	let i5 = 0;

	while (ugly.length < n) {
		const by2 = (ugly[i2] ?? 1) * 2;
		const by3 = (ugly[i3] ?? 1) * 3;
		const by5 = (ugly[i5] ?? 1) * 5;
		const next = Math.min(by2, by3, by5);
		ugly.push(next);
		if (next === by2) i2++;
		if (next === by3) i3++;
		if (next === by5) i5++;
	}

	return ugly[n - 1] ?? 1;
};
