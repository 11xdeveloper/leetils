/**
 * 3953. Maximum Score with Co-Prime Element
 *
 * Change elements to any value up to `maxVal` at a cost of 1 each, then
 * pick an element co-prime with all the others. Returns the best value of
 * the picked element minus the changes made.
 *
 * Conflicting elements are best changed to 1. Keeping element i costs one
 * change per other element sharing a prime with it; changing some element
 * to v costs 1 plus the conflicts with v, and if any element conflicts
 * with v, change that one to v. Count conflicts for every v by
 * inclusion-exclusion over the square-free divisors of v, from counts of
 * multiples.
 *
 * @see https://leetcode.com/problems/maximum-score-with-co-prime-element/
 * @difficulty Hard
 * @timeComplexity O(n + V log V + V · 2^ω), for ω distinct primes
 * @spaceComplexity O(V)
 *
 * @example
 * maximumScoreWithCoPrimeElement([3, 4, 6], 5); // 4
 */
export const maximumScoreWithCoPrimeElement = (
	nums: readonly number[],
	maxVal: number,
): number => {
	const limit = Math.max(maxVal, ...nums);
	const withValue = new Int32Array(limit + 1);
	for (const num of nums) withValue[num] = (withValue[num] ?? 0) + 1;
	const multiples = new Int32Array(limit + 1);
	for (let d = 1; d <= limit; d++)
		for (let x = d; x <= limit; x += d)
			multiples[d] = (multiples[d] ?? 0) + (withValue[x] ?? 0);
	const smallest = new Int32Array(limit + 1);
	for (let p = 2; p <= limit; p++)
		if (!smallest[p])
			for (let x = p; x <= limit; x += p) if (!smallest[x]) smallest[x] = p;
	/** Elements sharing a prime factor with v. */
	const conflicts = (v: number): number => {
		const primes: number[] = [];
		for (let x = v; x > 1; ) {
			const p = smallest[x] ?? x;
			primes.push(p);
			while (x % p === 0) x /= p;
		}
		let total = 0;
		for (let mask = 1; mask < 1 << primes.length; mask++) {
			let [d, bits] = [1, 0];
			primes.forEach((p, i) => {
				if ((mask >> i) & 1) {
					d *= p;
					bits++;
				}
			});
			total += (bits % 2 === 1 ? 1 : -1) * (multiples[d] ?? 0);
		}
		return total;
	};
	let best = Number.NEGATIVE_INFINITY;
	for (const num of new Set(nums))
		best = Math.max(best, num - (conflicts(num) - (num > 1 ? 1 : 0)));
	for (let v = 1; v <= maxVal; v++)
		best = Math.max(best, v - 1 - Math.max(0, conflicts(v) - 1));
	return best;
};
