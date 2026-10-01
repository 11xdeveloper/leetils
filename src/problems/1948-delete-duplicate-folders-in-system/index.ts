/** A folder in the trie of paths. */
interface Folder {
	children: Map<string, Folder>;
	signature: string;
	deleted: boolean;
}

/**
 * 1948. Delete Duplicate Folders in System
 *
 * Folders with the same non-empty structure of subfolders are identical;
 * all identical folders and their subfolders are deleted (once). Returns
 * the remaining folder paths, in any order.
 *
 * Build a trie of the paths and give each folder a signature describing
 * its subtree (children sorted by name), computed bottom-up with an
 * explicit stack. Signatures seen more than once mark folders for
 * deletion; finally collect the paths that avoid deleted folders.
 *
 * @see https://leetcode.com/problems/delete-duplicate-folders-in-system/
 * @difficulty Hard
 * @timeComplexity O(L log L) for total path length L
 * @spaceComplexity O(L)
 *
 * @example
 * deleteDuplicateFoldersInSystem([["a"], ["c"], ["d"], ["a", "b"], ["c", "b"], ["d", "a"]]); // [["d"], ["d", "a"]]
 */
export const deleteDuplicateFoldersInSystem = (
	paths: readonly (readonly string[])[],
): string[][] => {
	const newFolder = (): Folder => ({
		children: new Map(),
		signature: "",
		deleted: false,
	});
	const root = newFolder();
	for (const path of paths) {
		let folder = root;
		for (const name of path) {
			let child = folder.children.get(name);
			if (!child) {
				child = newFolder();
				folder.children.set(name, child);
			}
			folder = child;
		}
	}
	const counts = new Map<string, number>();
	const postOrder: Folder[] = [];
	const stack = [root];
	for (let folder = stack.pop(); folder; folder = stack.pop()) {
		postOrder.push(folder);
		stack.push(...folder.children.values());
	}
	for (const folder of postOrder.reverse()) {
		const parts = [...folder.children.entries()]
			.map(([name, child]) => `${name}(${child.signature})`)
			.sort();
		folder.signature = parts.join("");
		if (folder.signature)
			counts.set(folder.signature, (counts.get(folder.signature) ?? 0) + 1);
	}
	for (const folder of postOrder)
		if ((counts.get(folder.signature) ?? 0) > 1) folder.deleted = true;
	const remaining: string[][] = [];
	const walk: [Folder, string[]][] = [[root, []]];
	for (let entry = walk.pop(); entry; entry = walk.pop()) {
		const [folder, path] = entry;
		for (const [name, child] of folder.children) {
			if (child.deleted) continue;
			const childPath = [...path, name];
			remaining.push(childPath);
			walk.push([child, childPath]);
		}
	}
	return remaining;
};
