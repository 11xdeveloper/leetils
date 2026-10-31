/**
 * 3612. Process String with Special Operations I
 *
 * Build a result from `s` left to right: a letter appends itself, `*`
 * removes the last character, `#` appends a copy of the result and `%`
 * reverses it. Returns the result.
 *
 * @see https://leetcode.com/problems/process-string-with-special-operations-i/
 * @difficulty Medium
 * @timeComplexity O(n · L)
 * @spaceComplexity O(L)
 *
 * @example
 * processStringWithSpecialOperationsI("a#b%*"); // "ba"
 */
export const processStringWithSpecialOperationsI = (s: string): string => {
	let result = "";
	for (const c of s) {
		if (c === "*") result = result.slice(0, -1);
		else if (c === "#") result += result;
		else if (c === "%") result = [...result].reverse().join("");
		else result += c;
	}
	return result;
};
