const INT_MAX = 2 ** 31 - 1;
const INT_MIN = -(2 ** 31);

/**
 * 8. String to Integer (atoi)
 *
 * Converts `s` to a 32-bit signed integer like C's `atoi`:
 * 1. Skip leading spaces (only `" "`, not other whitespace).
 * 2. Read an optional `+` or `-` sign.
 * 3. Read digits until the first non-digit. If there are none, the result
 *    is 0.
 * 4. Clamp the result to [-2^31, 2^31 - 1].
 *
 * Unlike `Number.parseInt`, this rejects `0x` prefixes and clamps
 * out-of-range values.
 *
 * @see https://leetcode.com/problems/string-to-integer-atoi/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * stringToIntegerAtoi("   -042"); // -42
 * stringToIntegerAtoi("1337c0d3"); // 1337
 * stringToIntegerAtoi("91283472332"); // 2147483647
 */
export const stringToIntegerAtoi = (s: string): number => {
	let i = 0;
	while (s[i] === " ") i++;

	const sign = s[i] === "-" ? -1 : 1;
	if (s[i] === "-" || s[i] === "+") i++;

	let result = 0;
	for (; i < s.length; i++) {
		const digit = s.charCodeAt(i) - 48; // "0" is char code 48
		if (digit < 0 || digit > 9) break;

		result = result * 10 + digit;
		// 2^31 fits in INT_MIN, so the negative limit is also reached here.
		if (result > INT_MAX) return sign === 1 ? INT_MAX : INT_MIN;
	}

	// Avoid returning -0 for inputs like "-0".
	return result === 0 ? 0 : sign * result;
};
