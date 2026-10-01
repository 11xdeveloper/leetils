/**
 * 388. Longest Absolute File Path
 *
 * Given a file system written one entry per line, with tabs showing each
 * entry's depth (like `"dir\n\tsubdir\n\t\tfile.ext"`), returns the length of
 * the longest absolute path to a file, such as `"dir/subdir/file.ext"`, or 0
 * if there are no files. Files are the entries whose names contain a `.`.
 *
 * Keeps the path length at each depth so far: an entry at depth `d` extends
 * the path at depth `d - 1` by its name and a `/`.
 *
 * @see https://leetcode.com/problems/longest-absolute-file-path/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestAbsoluteFilePath("dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"); // 20, for "dir/subdir2/file.ext"
 */
export const longestAbsoluteFilePath = (input: string): number => {
	// lengthAt[d]: the length of the current path through depth d, with a trailing "/".
	const lengthAt = [0];
	let longest = 0;

	for (const line of input.split("\n")) {
		const name = line.replace(/^\t*/, "");
		const depth = line.length - name.length;
		const length = (lengthAt[depth] ?? 0) + name.length;
		if (name.includes(".")) longest = Math.max(longest, length);
		else lengthAt[depth + 1] = length + 1;
	}

	return longest;
};
