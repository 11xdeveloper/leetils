/**
 * 3714. Longest Balanced Substring II
 *
 * `s` holds only a, b and c. A substring is balanced if its distinct
 * letters appear equally often. Returns the longest balanced length.
 *
 * Split by which letters appear. One letter: the longest run. Two letters
 * x and y without the third: within each stretch free of the third
 * letter, the earliest prefix with the same count difference. All three:
 * the earliest prefix with the same pair of differences (a - b, b - c).
 *
 * @see https://leetcode.com/problems/longest-balanced-substring-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestBalancedSubstringII("aabcc"); // 3
 */
export const longestBalancedSubstringII = (s: string): number => {
	const n = s.length;
	let best = 0;
	let run = 0;
	for (let i = 0; i < n; i++) {
		run = i > 0 && s[i] === s[i - 1] ? run + 1 : 1;
		best = Math.max(best, run);
	}
	for (const [x, , z] of [
		["a", "b", "c"],
		["a", "c", "b"],
		["b", "c", "a"],
	]) {
		let first = new Map<number, number>([[0, -1]]);
		let difference = 0;
		for (let i = 0; i < n; i++) {
			const c = s[i];
			if (c === z) {
				first = new Map([[0, i]]);
				difference = 0;
				continue;
			}
			difference += c === x ? 1 : -1;
			const seen = first.get(difference);
			if (seen === undefined) first.set(difference, i);
			else best = Math.max(best, i - seen);
		}
	}
	const first = new Map<string, number>([["0,0", -1]]);
	let [a, b, c] = [0, 0, 0];
	for (let i = 0; i < n; i++) {
		if (s[i] === "a") a++;
		else if (s[i] === "b") b++;
		else c++;
		const key = `${a - b},${b - c}`;
		const seen = first.get(key);
		if (seen === undefined) first.set(key, i);
		else best = Math.max(best, i - seen);
	}
	return best;
};
