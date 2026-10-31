/**
 * 3869. Count Fancy Numbers in a Range
 *
 * A number is good if its digits strictly increase or strictly decrease
 * (single digits count), and fancy if it or its digit sum is good.
 * Counts the fancy numbers from `l` to `r`.
 *
 * Good numbers are few (built from subsets of digits), and digit sums are
 * small. Count numbers in range by digit sum with a digit DP and add
 * those whose sum is good, then add the good numbers in range whose sum
 * isn't.
 *
 * @see https://leetcode.com/problems/count-fancy-numbers-in-a-range/
 * @difficulty Hard
 * @timeComplexity O(log r · S · 10 + 2^10), for digit sums up to S
 * @spaceComplexity O(log r · S)
 *
 * @example
 * countFancyNumbersInARange(8, 10); // 3
 */
export const countFancyNumbersInARange = (l: number, r: number): number => {
	const isGood = (x: number): boolean => {
		const digits = String(x);
		if (digits.length === 1) return true;
		let [up, down] = [true, true];
		for (let i = 1; i < digits.length; i++) {
			if ((digits[i] ?? "") <= (digits[i - 1] ?? "")) up = false;
			if ((digits[i] ?? "") >= (digits[i - 1] ?? "")) down = false;
		}
		return up || down;
	};
	const digitSum = (x: number) =>
		[...String(x)].reduce((s, d) => s + Number(d), 0);
	const maxSum = 9 * String(r).length;
	const goodSum = Array.from(
		{ length: maxSum + 1 },
		(_, s) => s > 0 && isGood(s),
	);
	/** How many numbers from 0 to n have each digit sum. */
	const bySum = (n: number): number[] => {
		const totals = new Array<number>(maxSum + 1).fill(0);
		if (n < 0) return totals;
		const digits = [...String(n)].map(Number);
		// ways[s]: numbers so far below n's prefix with digit sum s.
		let ways = new Array<number>(maxSum + 1).fill(0);
		let tightSum = 0;
		for (const d of digits) {
			const next = new Array<number>(maxSum + 1).fill(0);
			ways.forEach((count, s) => {
				if (count)
					for (let x = 0; x <= 9 && s + x <= maxSum; x++)
						next[s + x] = (next[s + x] ?? 0) + count;
			});
			for (let x = 0; x < d; x++)
				next[tightSum + x] = (next[tightSum + x] ?? 0) + 1;
			tightSum += d;
			ways = next;
		}
		ways[tightSum] = (ways[tightSum] ?? 0) + 1;
		ways.forEach((count, s) => {
			totals[s] = count;
		});
		return totals;
	};
	const [high, low] = [bySum(r), bySum(l - 1)];
	let count = 0;
	for (let s = 1; s <= maxSum; s++)
		if (goodSum[s]) count += (high[s] ?? 0) - (low[s] ?? 0);
	// Good numbers from subsets of digits, increasing or decreasing.
	const good = new Set<number>();
	for (let mask = 1; mask < 1 << 10; mask++) {
		const digits = Array.from({ length: 10 }, (_, d) => d).filter(
			(d) => (mask >> d) & 1,
		);
		const down = Number([...digits].reverse().join(""));
		if (digits[0] !== 0) good.add(Number(digits.join("")));
		if (String(down).length === digits.length) good.add(down);
	}
	for (const x of good) if (x >= l && x <= r && !goodSum[digitSum(x)]) count++;
	return count;
};
