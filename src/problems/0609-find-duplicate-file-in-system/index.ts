/**
 * 609. Find Duplicate File in System
 *
 * Each entry of `paths` is a directory followed by its files with their
 * contents, like `"root/a 1.txt(abcd) 2.txt(efgh)"`. Returns the groups of
 * file paths (at least two per group) that have the same content, in the
 * order each content is first seen.
 *
 * Parses every file and groups full paths by content in a map.
 *
 * @see https://leetcode.com/problems/find-duplicate-file-in-system/
 * @difficulty Medium
 * @timeComplexity O(total length of the input)
 * @spaceComplexity O(total length of the input)
 *
 * @example
 * findDuplicateFileInSystem(["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)"]); // [["root/a/1.txt", "root/c/3.txt"]]
 */
export const findDuplicateFileInSystem = (
	paths: readonly string[],
): string[][] => {
	const byContent = new Map<string, string[]>();
	for (const entry of paths) {
		const [directory = "", ...files] = entry.split(" ");
		for (const file of files) {
			const open = file.indexOf("(");
			const content = file.slice(open + 1, -1);
			const path = `${directory}/${file.slice(0, open)}`;
			const group = byContent.get(content);
			if (group) group.push(path);
			else byContent.set(content, [path]);
		}
	}
	return [...byContent.values()].filter((group) => group.length > 1);
};
