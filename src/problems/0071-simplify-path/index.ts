/**
 * 71. Simplify Path
 *
 * Converts an absolute Unix-style path into its canonical form: a single
 * slash between directories, no trailing slash, and `.` (current directory)
 * and `..` (parent directory) resolved. Any other name, like `...`, is an
 * ordinary directory.
 *
 * Splits the path on slashes and keeps a stack of directories, popping one
 * for each `..`.
 *
 * @see https://leetcode.com/problems/simplify-path/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * simplifyPath("/home/user/Documents/../Pictures"); // "/home/user/Pictures"
 */
export const simplifyPath = (path: string): string => {
	const directories: string[] = [];

	for (const part of path.split("/")) {
		if (part === "" || part === ".") continue;
		if (part === "..") directories.pop();
		else directories.push(part);
	}

	return `/${directories.join("/")}`;
};
