/**
 * 3863. Minimum Operations to Sort a String
 *
 * One operation sorts a substring that isn't the whole string. Returns
 * the fewest operations that sort `s`, or -1.
 *
 * Sorted already: 0. Two letters out of order: impossible. If the first
 * letter is already a smallest one, sort the rest; likewise if the last
 * is a largest one: 1. If a smallest letter sits anywhere but the end,
 * sorting all but the last brings it to the front, then sort the rest
 * (similarly for a largest letter): 2. Otherwise the only largest letter
 * is first and the only smallest is last, which takes 3.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-sort-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToSortAString("card"); // 2
 */
export const minimumOperationsToSortAString = (s: string): number => {
	const n = s.length;
	let sorted = true;
	for (let i = 1; i < n; i++)
		if (s[i - 1] !== undefined && (s[i - 1] ?? "") > (s[i] ?? ""))
			sorted = false;
	if (sorted) return 0;
	if (n === 2) return -1;
	let [low, high] = [s.charAt(0), s.charAt(0)];
	for (const c of s) {
		if (c < low) low = c;
		if (c > high) high = c;
	}
	if (s.charAt(0) === low || s.charAt(n - 1) === high) return 1;
	if (s.slice(0, n - 1).includes(low) || s.slice(1).includes(high)) return 2;
	return 3;
};
