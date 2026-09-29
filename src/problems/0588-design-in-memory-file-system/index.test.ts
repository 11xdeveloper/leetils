import { describe, expect, it } from "bun:test";
import { DesignInMemoryFileSystem as FileSystem } from ".";

describe("588. Design In-Memory File System", () => {
	it("solves the example from the problem statement", () => {
		const fs = new FileSystem();
		expect(fs.ls("/")).toEqual([]);
		fs.mkdir("/a/b/c");
		fs.addContentToFile("/a/b/c/d", "hello");
		expect(fs.ls("/")).toEqual(["a"]);
		expect(fs.readContentFromFile("/a/b/c/d")).toBe("hello");
	});

	it("lists files by name and directories in lexicographic order", () => {
		const fs = new FileSystem();
		fs.mkdir("/zoo");
		fs.mkdir("/apple/pie");
		fs.addContentToFile("/mango", "x");
		fs.addContentToFile("/apple/banana", "y");
		expect(fs.ls("/")).toEqual(["apple", "mango", "zoo"]);
		expect(fs.ls("/apple")).toEqual(["banana", "pie"]);
		expect(fs.ls("/apple/banana")).toEqual(["banana"]);
		expect(fs.ls("/apple/pie")).toEqual([]);
	});

	it("appends to existing files", () => {
		const fs = new FileSystem();
		fs.addContentToFile("/notes", "one");
		fs.addContentToFile("/notes", " two");
		expect(fs.readContentFromFile("/notes")).toBe("one two");
	});
});
