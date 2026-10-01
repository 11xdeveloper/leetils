/**
 * 937. Reorder Data in Log Files
 *
 * Each log is an identifier followed by words. Letter-logs (words of
 * letters) come first, sorted by their contents and then identifier;
 * digit-logs follow in their original order.
 *
 * Splits the logs into the two kinds and sorts the letter-logs.
 *
 * @see https://leetcode.com/problems/reorder-data-in-log-files/
 * @difficulty Medium
 * @timeComplexity O(n log n · L)
 * @spaceComplexity O(n · L)
 *
 * @example
 * reorderDataInLogFiles(["dig1 8 1 5 1", "let1 art can", "dig2 3 6", "let2 own kit dig", "let3 art zero"]);
 * // ["let1 art can", "let3 art zero", "let2 own kit dig", "dig1 8 1 5 1", "dig2 3 6"]
 */
export const reorderDataInLogFiles = (logs: readonly string[]): string[] => {
	const split = (log: string): [identifier: string, content: string] => {
		const space = log.indexOf(" ");
		return [log.slice(0, space), log.slice(space + 1)];
	};
	const compare = (a: string, b: string): number =>
		a < b ? -1 : a > b ? 1 : 0;
	const isDigitLog = (log: string): boolean => /^\d/.test(split(log)[1]);

	const letters = logs
		.filter((log) => !isDigitLog(log))
		.sort((a, b) => {
			const [idA, contentA] = split(a);
			const [idB, contentB] = split(b);
			return compare(contentA, contentB) || compare(idA, idB);
		});
	return [...letters, ...logs.filter(isDigitLog)];
};
