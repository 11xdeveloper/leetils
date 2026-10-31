/**
 * 2259. Remove Digit From Number to Maximize Result
 *
 * Removes one occurrence of `digit` from `number` to leave the largest
 * result.
 *
 * Try each occurrence; the results have equal length, so compare as
 * strings.
 *
 * @see https://leetcode.com/problems/remove-digit-from-number-to-maximize-result/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * removeDigitFromNumberToMaximizeResult("1231", "1"); // "231"
 */
export const removeDigitFromNumberToMaximizeResult = (
	number: string,
	digit: string,
): string => {
	let best = "";
	for (let i = 0; i < number.length; i++) {
		if (number[i] !== digit) continue;
		const candidate = number.slice(0, i) + number.slice(i + 1);
		if (candidate > best) best = candidate;
	}
	return best;
};
