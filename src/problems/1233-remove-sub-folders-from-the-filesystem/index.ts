/**
 * 1233. Remove Sub-Folders from the Filesystem
 *
 * Returns the folders in `folder` that aren't inside another listed folder,
 * sorted. `/a/b` is inside `/a`, but `/ab` isn't.
 *
 * After sorting, a folder's sub-folders come right after it (before any
 * sibling), so each folder only needs checking against the last one kept.
 *
 * @see https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/
 * @difficulty Medium
 * @timeComplexity O(n log n · L) for paths up to L long
 * @spaceComplexity O(n · L)
 *
 * @example
 * removeSubFoldersFromTheFilesystem(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]); // ["/a", "/c/d", "/c/f"]
 */
export const removeSubFoldersFromTheFilesystem = (
	folder: readonly string[],
): string[] => {
	const kept: string[] = [];
	for (const path of folder.toSorted()) {
		const last = kept.at(-1);
		if (last === undefined || !path.startsWith(`${last}/`)) kept.push(path);
	}
	return kept;
};
