/**
 * 588. Design In-Memory File System
 *
 * An in-memory file system with absolute paths like `"/a/b/c"`:
 *
 * - `ls(path)` lists a directory's entries in lexicographic order, or, for
 *   a file, just its name.
 * - `mkdir(path)` creates a directory, along with any missing parents.
 * - `addContentToFile(filePath, content)` creates the file or appends to it.
 * - `readContentFromFile(filePath)` returns the file's content.
 *
 * A tree of directories, each a map from names to child directories or
 * files. Paths are resolved one name at a time from the root.
 *
 * @see https://leetcode.com/problems/design-in-memory-file-system/
 * @difficulty Hard
 * @timeComplexity O(path length) per operation, plus O(k log k) for `ls` on k entries
 * @spaceComplexity O(total length of names and contents)
 *
 * @example
 * const fs = new DesignInMemoryFileSystem();
 * fs.addContentToFile("/a/b/c/d", "hello");
 * fs.ls("/"); // ["a"]
 */
export class DesignInMemoryFileSystem {
	readonly #root: Directory = { children: new Map() };

	ls(path: string): string[] {
		const names = this.#names(path);
		let node: Directory | File = this.#root;
		for (const name of names) {
			if (!("children" in node)) break;
			const child = node.children.get(name);
			if (!child) return [];
			node = child;
		}
		if (!("children" in node)) return [names.at(-1) ?? ""];
		return [...node.children.keys()].sort();
	}

	mkdir(path: string): void {
		this.#directory(this.#names(path));
	}

	addContentToFile(filePath: string, content: string): void {
		const names = this.#names(filePath);
		const name = names.pop() ?? "";
		const directory = this.#directory(names);
		const existing = directory.children.get(name);
		if (existing && "content" in existing) existing.content += content;
		else directory.children.set(name, { content });
	}

	readContentFromFile(filePath: string): string {
		const names = this.#names(filePath);
		const name = names.pop() ?? "";
		const file = this.#directory(names).children.get(name);
		return file && "content" in file ? file.content : "";
	}

	#names(path: string): string[] {
		return path.split("/").filter((name) => name !== "");
	}

	/** The directory at the given names, created along with its parents if missing. */
	#directory(names: readonly string[]): Directory {
		let directory = this.#root;
		for (const name of names) {
			let child = directory.children.get(name);
			if (!child || !("children" in child)) {
				child = { children: new Map() };
				directory.children.set(name, child);
			}
			directory = child;
		}
		return directory;
	}
}

interface Directory {
	children: Map<string, Directory | File>;
}

interface File {
	content: string;
}
