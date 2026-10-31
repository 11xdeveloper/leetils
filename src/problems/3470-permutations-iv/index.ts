/**
 * 3470. Permutations IV
 *
 * The k-th (from 1) lexicographically smallest permutation of 1 to `n` in
 * which neighbours alternate between odd and even, or `[]` if there are
 * fewer than k.
 *
 * Once the first number is fixed, the parity of every position is too, and
 * the rest can be any arrangement of the remaining odds and evens in their
 * slots. So count completions as factorials (capped past 10¹⁵) and pick
 * each position's number by skipping over whole blocks of completions.
 *
 * @see https://leetcode.com/problems/permutations-iv/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * permutationsIV(4, 6); // [3, 4, 1, 2]
 */
export const permutationsIV = (n: number, k: number): number[] => {
	const CAP = 1e16;
	const factorial = [1];
	for (let i = 1; i <= n; i++)
		factorial.push(Math.min(CAP, (factorial[i - 1] ?? 1) * i));
	const completions = (
		odds: number,
		evens: number,
		nextOdd: boolean,
	): number => {
		const slotsOdd = nextOdd
			? Math.ceil((odds + evens) / 2)
			: Math.floor((odds + evens) / 2);
		if (slotsOdd !== odds) return 0;
		return Math.min(CAP, (factorial[odds] ?? 1) * (factorial[evens] ?? 1));
	};
	const used = new Uint8Array(n + 1);
	let odds = Math.ceil(n / 2);
	let evens = Math.floor(n / 2);
	let left = k;
	const result: number[] = [];
	for (let position = 0; position < n; position++) {
		const last = result.at(-1);
		let placed = false;
		for (let v = 1; v <= n && !placed; v++) {
			if (used[v] || (last !== undefined && last % 2 === v % 2)) continue;
			const odd = v % 2 === 1;
			const ways = completions(
				odds - (odd ? 1 : 0),
				evens - (odd ? 0 : 1),
				!odd,
			);
			if (ways < left) {
				left -= ways;
				continue;
			}
			result.push(v);
			used[v] = 1;
			if (odd) odds--;
			else evens--;
			placed = true;
		}
		if (!placed) return [];
	}
	return result;
};
