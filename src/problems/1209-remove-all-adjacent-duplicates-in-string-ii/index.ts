/**
 * 1209. Remove All Adjacent Duplicates in String II
 *
 * Repeatedly removes `k` adjacent equal letters from `s` until no more can
 * be removed, and returns what's left.
 *
 * A stack of runs, each a letter and how many times it repeats. A letter
 * extends the top run or starts a new one, and a run reaching `k` is
 * popped, which lets the runs either side of it meet.
 *
 * @see https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeAllAdjacentDuplicatesInStringII("deeedbbcccbdaa", 3); // "aa"
 */
export const removeAllAdjacentDuplicatesInStringII = (
	s: string,
	k: number,
): string => {
	const runs: [char: string, count: number][] = [];
	for (const char of s) {
		const top = runs.at(-1);
		if (top?.[0] === char) {
			top[1]++;
			if (top[1] === k) runs.pop();
		} else {
			runs.push([char, 1]);
		}
	}
	return runs.map(([char, count]) => char.repeat(count)).join("");
};
