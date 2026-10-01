import { describe, expect, it } from "bun:test";
import { OperationsOnTree as LockingTree } from ".";

describe("1993. Operations on Tree", () => {
	it("solves the example from the problem statement", () => {
		const tree = new LockingTree([-1, 0, 0, 1, 1, 2, 2]);
		expect(tree.lock(2, 2)).toBeTrue();
		expect(tree.unlock(2, 3)).toBeFalse();
		expect(tree.unlock(2, 2)).toBeTrue();
		expect(tree.lock(4, 5)).toBeTrue();
		expect(tree.upgrade(0, 1)).toBeTrue();
		expect(tree.lock(0, 1)).toBeFalse();
	});

	it("refuses upgrades under a locked ancestor or without locked descendants", () => {
		const tree = new LockingTree([-1, 0, 1, 2]);
		expect(tree.upgrade(1, 1)).toBeFalse();
		expect(tree.lock(3, 2)).toBeTrue();
		expect(tree.lock(0, 9)).toBeTrue();
		expect(tree.upgrade(1, 1)).toBeFalse();
		expect(tree.unlock(0, 9)).toBeTrue();
		expect(tree.upgrade(1, 1)).toBeTrue();
		expect(tree.unlock(3, 2)).toBeFalse();
	});
});
