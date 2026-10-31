/**
 * 2468. Split Message Based on Limit
 *
 * Splits `message` into parts ending in "<a/b>" (part `a` of `b`), each
 * exactly `limit` characters long except possibly the last. Returns the
 * parts for the fewest `b`, or `[]`.
 *
 * For each `b`, the capacity is `b · (limit - 3 - digits(b))` minus the
 * digits of 1 to `b`; take the first `b` that fits.
 *
 * @see https://leetcode.com/problems/split-message-based-on-limit/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * splitMessageBasedOnLimit("short message", 15); // ["short mess<1/2>", "age<2/2>"]
 */
export const splitMessageBasedOnLimit = (
	message: string,
	limit: number,
): string[] => {
	let indexDigits = 0;
	for (let parts = 1; parts <= message.length; parts++) {
		indexDigits += String(parts).length;
		const width = String(parts).length;
		if (limit - 3 - 2 * width < 1) return [];
		const capacity = parts * (limit - 3 - width) - indexDigits;
		if (capacity < message.length) continue;
		const result: string[] = [];
		let start = 0;
		for (let a = 1; a <= parts; a++) {
			const suffix = `<${a}/${parts}>`;
			const take = limit - suffix.length;
			result.push(message.slice(start, start + take) + suffix);
			start += take;
		}
		return result;
	}
	return [];
};
