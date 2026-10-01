/**
 * 1694. Reformat Phone Number
 *
 * Drops spaces and dashes from `number`, then groups the digits in blocks
 * of three, ending with either one block of two or three, or two blocks of
 * two, joined by dashes.
 *
 * Takes blocks of three while more than four digits remain, then splits
 * the rest into one block (2 or 3 digits) or two blocks of two.
 *
 * @see https://leetcode.com/problems/reformat-phone-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reformatPhoneNumber("123 4-5678"); // "123-456-78"
 */
export const reformatPhoneNumber = (number: string): string => {
	const digits = number.replace(/[ -]/g, "");
	const blocks: string[] = [];
	let i = 0;
	for (; digits.length - i > 4; i += 3) blocks.push(digits.slice(i, i + 3));
	const rest = digits.slice(i);
	if (rest.length === 4) blocks.push(rest.slice(0, 2), rest.slice(2));
	else blocks.push(rest);
	return blocks.join("-");
};
