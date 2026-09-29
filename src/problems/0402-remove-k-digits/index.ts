/**
 * 402. Remove K Digits
 *
 * Removes `k` digits from the number written in `num` to leave the smallest
 * possible number, returned without leading zeros (or `"0"`).
 *
 * A digit followed by a smaller one should go, since removing it makes the
 * number smaller at the highest place possible. A stack builds the result,
 * popping larger digits while removals remain; any left over come off the
 * end.
 *
 * @see https://leetcode.com/problems/remove-k-digits/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeKDigits("1432219", 3); // "1219"
 */
export const removeKDigits = (num: string, k: number): string => {
	const stack: string[] = [];
	let remaining = k;

	for (const digit of num) {
		while (remaining > 0 && stack.length > 0 && (stack.at(-1) ?? "") > digit) {
			stack.pop();
			remaining--;
		}
		stack.push(digit);
	}

	const kept = stack
		.slice(0, stack.length - remaining)
		.join("")
		.replace(/^0+/, "");
	return kept === "" ? "0" : kept;
};
