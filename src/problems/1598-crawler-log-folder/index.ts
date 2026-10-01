/**
 * 1598. Crawler Log Folder
 *
 * Follows folder changes (`"../"`, `"./"` or `"name/"`) from the main
 * folder and returns how many `"../"` steps lead back.
 *
 * Tracks the depth, which never goes below the main folder.
 *
 * @see https://leetcode.com/problems/crawler-log-folder/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * crawlerLogFolder(["d1/", "d2/", "../", "d21/", "./"]); // 2
 */
export const crawlerLogFolder = (logs: readonly string[]): number => {
	let depth = 0;
	for (const log of logs) {
		if (log === "../") depth = Math.max(0, depth - 1);
		else if (log !== "./") depth++;
	}
	return depth;
};
