/**
 * 3458. Select K Disjoint Special Substrings
 *
 * A special substring isn't the whole string and has no letter that also
 * appears outside it. Returns whether `k` disjoint special substrings can
 * be chosen.
 *
 * Every special substring contains a minimal one starting at some letter's
 * first occurrence: extend to cover each included letter's last
 * occurrence, failing if a letter appeared earlier. Then pick as many
 * disjoint ones as possible, earliest ending first.
 *
 * @see https://leetcode.com/problems/select-k-disjoint-special-substrings/
 * @difficulty Medium
 * @timeComplexity O(26 n)
 * @spaceComplexity O(1)
 *
 * @example
 * selectKDisjointSpecialSubstrings("abcdbaefab", 2); // true
 */
export const selectKDisjointSpecialSubstrings = (
	s: string,
	k: number,
): boolean => {
	if (k === 0) return true;
	const n = s.length;
	const first = new Array<number>(26).fill(-1);
	const last = new Array<number>(26).fill(-1);
	for (let i = 0; i < n; i++) {
		const letter = s.charCodeAt(i) - 97;
		if (first[letter] === -1) first[letter] = i;
		last[letter] = i;
	}
	const intervals: [number, number][] = [];
	for (const start of first) {
		if (start === -1) continue;
		let end = start;
		let valid = true;
		for (let j = start; j <= end && valid; j++) {
			const letter = s.charCodeAt(j) - 97;
			if ((first[letter] ?? 0) < start) valid = false;
			end = Math.max(end, last[letter] ?? 0);
		}
		if (valid && end - start + 1 < n) intervals.push([start, end]);
	}
	intervals.sort((a, b) => a[1] - b[1]);
	let chosen = 0;
	let reach = -1;
	for (const [start, end] of intervals)
		if (start > reach) {
			chosen++;
			reach = end;
		}
	return chosen >= k;
};
