import { describe, expect, it } from "bun:test";
import { DesignFileSystem as FileSystem } from ".";

describe("1166. Design File System", () => {
	it("solves the examples from the problem statement", () => {
		const first = new FileSystem();
		expect(first.createPath("/a", 1)).toBeTrue();
		expect(first.get("/a")).toBe(1);

		const second = new FileSystem();
		expect(second.createPath("/leet", 1)).toBeTrue();
		expect(second.createPath("/leet/code", 2)).toBeTrue();
		expect(second.get("/leet/code")).toBe(2);
		expect(second.createPath("/c/d", 1)).toBeFalse();
		expect(second.get("/c")).toBe(-1);
	});

	it("refuses to create a path twice and keeps the first value", () => {
		const files = new FileSystem();
		expect(files.createPath("/a", 1)).toBeTrue();
		expect(files.createPath("/a", 2)).toBeFalse();
		expect(files.get("/a")).toBe(1);
	});

	it("doesn't treat a path that shares a prefix as a parent", () => {
		const files = new FileSystem();
		expect(files.createPath("/ab", 1)).toBeTrue();
		expect(files.createPath("/a/b", 2)).toBeFalse();
		expect(files.createPath("/ab/c", 3)).toBeTrue();
		expect(files.get("/ab/c")).toBe(3);
	});
});
