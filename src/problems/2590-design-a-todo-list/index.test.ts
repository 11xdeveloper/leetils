import { describe, expect, it } from "bun:test";
import { DesignATodoList as TodoList } from ".";

describe("2590. Design a Todo List", () => {
	it("solves the example from the problem statement", () => {
		const todo = new TodoList();
		expect(todo.addTask(1, "Task1", 50, [])).toBe(1);
		expect(todo.addTask(1, "Task2", 100, ["P1"])).toBe(2);
		expect(todo.getAllTasks(1)).toEqual(["Task1", "Task2"]);
		expect(todo.getAllTasks(5)).toEqual([]);
		expect(todo.addTask(1, "Task3", 30, ["P1"])).toBe(3);
		expect(todo.getTasksForTag(1, "P1")).toEqual(["Task3", "Task2"]);
		todo.completeTask(5, 1);
		todo.completeTask(1, 2);
		expect(todo.getTasksForTag(1, "P1")).toEqual(["Task3"]);
		expect(todo.getAllTasks(1)).toEqual(["Task3", "Task1"]);
	});
});
