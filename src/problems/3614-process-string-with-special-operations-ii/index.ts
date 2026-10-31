/**
 * 3614. Process String with Special Operations II
 *
 * Build a result from `s` as in part I (letters append, `*` removes the
 * last character, `#` doubles, `%` reverses). Returns its k-th character,
 * or "." if it's shorter, without building it.
 *
 * Record the length after each operation, then undo the operations from
 * the end, tracking where the k-th character came from: a doubling maps
 * the second copy onto the first, a reversal mirrors the position, and the
 * letter that was appended at that position is the answer.
 *
 * @see https://leetcode.com/problems/process-string-with-special-operations-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * processStringWithSpecialOperationsII("cd%#*#", 3); // "d"
 */
export const processStringWithSpecialOperationsII = (
	s: string,
	k: number,
): string => {
	const lengths: number[] = [];
	let length = 0;
	for (const c of s) {
		if (c === "*") length = Math.max(0, length - 1);
		else if (c === "#") length *= 2;
		else if (c !== "%") length++;
		lengths.push(length);
	}
	if (k >= length) return ".";
	for (let i = s.length - 1; i >= 0; i--) {
		const c = s.charAt(i);
		const before = i > 0 ? (lengths[i - 1] ?? 0) : 0;
		if (c === "#") {
			if (k >= before) k -= before;
		} else if (c === "%") k = before - 1 - k;
		else if (c !== "*" && k === before) return c;
	}
	return ".";
};
