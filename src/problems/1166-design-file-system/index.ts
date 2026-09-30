/**
 * 1166. Design File System
 *
 * Stores values at paths like `/a/b`. `createPath(path, value)` adds a path
 * if it's new and its parent exists (returning whether it did), and
 * `get(path)` returns a path's value, or -1 if it doesn't exist.
 *
 * A map from each full path to its value; a path's parent is everything
 * before its last `/`, where the empty string is the root.
 *
 * @see https://leetcode.com/problems/design-file-system/
 * @difficulty Medium
 * @timeComplexity O(L) per call for a path of length L
 * @spaceComplexity O(total length of paths created)
 *
 * @example
 * const files = new DesignFileSystem();
 * files.createPath("/leet", 1); // true
 * files.createPath("/c/d", 1); // false
 * files.get("/leet"); // 1
 */
export class DesignFileSystem {
	readonly #values = new Map<string, number>();

	createPath(path: string, value: number): boolean {
		const parent = path.slice(0, path.lastIndexOf("/"));
		if (this.#values.has(path) || (parent !== "" && !this.#values.has(parent)))
			return false;
		this.#values.set(path, value);
		return true;
	}

	get(path: string): number {
		return this.#values.get(path) ?? -1;
	}
}
