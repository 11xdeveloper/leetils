import { describe, expect, it } from "bun:test";
import { countOfUnfinishedTasksAfterEachShift as countTasks } from ".";

describe("4012. Count of Unfinished Tasks After Each Shift", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTasks([1, 4, 4], [9, 1, 4])).toEqual([0, 2, 1]);
		expect(countTasks([2, 3, 4], [20, 4, 5])).toEqual([0, 2, 0]);
		expect(countTasks([4, 2], [3, 6, 1])).toEqual([2, 0, 2]);
	});
});
