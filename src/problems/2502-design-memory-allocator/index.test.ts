import { describe, expect, it } from "bun:test";
import { DesignMemoryAllocator as Allocator } from ".";

describe("2502. Design Memory Allocator", () => {
	it("solves the example from the problem statement", () => {
		const allocator = new Allocator(10);
		expect(allocator.allocate(1, 1)).toBe(0);
		expect(allocator.allocate(1, 2)).toBe(1);
		expect(allocator.allocate(1, 3)).toBe(2);
		expect(allocator.freeMemory(2)).toBe(1);
		expect(allocator.allocate(3, 4)).toBe(3);
		expect(allocator.allocate(1, 1)).toBe(1);
		expect(allocator.allocate(1, 1)).toBe(6);
		expect(allocator.freeMemory(1)).toBe(3);
		expect(allocator.allocate(10, 2)).toBe(-1);
		expect(allocator.freeMemory(7)).toBe(0);
	});
});
