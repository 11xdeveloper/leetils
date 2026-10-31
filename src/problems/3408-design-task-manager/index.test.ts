import { describe, expect, it } from "bun:test";
import { DesignTaskManager as TaskManager } from ".";

describe("3408. Design Task Manager", () => {
	it("solves the examples from the problem statement", () => {
		const manager = new TaskManager([
			[1, 101, 10],
			[2, 102, 20],
			[3, 103, 15],
		]);
		manager.add(4, 104, 5);
		manager.edit(102, 8);
		expect(manager.execTop()).toBe(3);
		manager.rmv(101);
		manager.add(5, 105, 15);
		expect(manager.execTop()).toBe(5);
	});

	it("returns -1 when empty and breaks ties by task ID", () => {
		const manager = new TaskManager([
			[1, 1, 5],
			[2, 2, 5],
		]);
		expect([manager.execTop(), manager.execTop(), manager.execTop()]).toEqual([
			2, 1, -1,
		]);
	});
});
