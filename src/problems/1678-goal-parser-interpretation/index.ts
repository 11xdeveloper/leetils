/**
 * 1678. Goal Parser Interpretation
 *
 * Interprets `command`, where `G` means "G", `()` means "o" and `(al)`
 * means "al".
 *
 * Replaces the two bracketed tokens.
 *
 * @see https://leetcode.com/problems/goal-parser-interpretation/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * goalParserInterpretation("G()(al)"); // "Goal"
 */
export const goalParserInterpretation = (command: string): string =>
	command.replaceAll("()", "o").replaceAll("(al)", "al");
