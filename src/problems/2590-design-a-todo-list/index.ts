interface Task {
	readonly id: number;
	readonly userId: number;
	readonly description: string;
	readonly dueDate: number;
	readonly tags: ReadonlySet<string>;
	done: boolean;
}

/**
 * 2590. Design a Todo List
 *
 * A todo list shared by many users. `addTask` returns task ids counting
 * from 1. `getAllTasks` and `getTasksForTag` list a user's unfinished
 * task descriptions, optionally with a tag, by due date. `completeTask`
 * finishes a task if it belongs to that user.
 *
 * Keep each user's tasks in a list and sort when asked; due dates are
 * unique.
 *
 * @see https://leetcode.com/problems/design-a-todo-list/
 * @difficulty Medium
 * @timeComplexity O(1) to add or complete, O(t log t) to list a user's `t` tasks
 * @spaceComplexity O(total tasks and tags)
 *
 * @example
 * const todo = new DesignATodoList();
 * todo.addTask(1, "Task1", 50, []); // 1
 * todo.getAllTasks(1); // ["Task1"]
 */
export class DesignATodoList {
	readonly #tasks: Task[] = [];
	readonly #byUser = new Map<number, Task[]>();

	addTask(
		userId: number,
		taskDescription: string,
		dueDate: number,
		tags: readonly string[],
	): number {
		const task: Task = {
			id: this.#tasks.length + 1,
			userId,
			description: taskDescription,
			dueDate,
			tags: new Set(tags),
			done: false,
		};
		this.#tasks.push(task);
		const own = this.#byUser.get(userId) ?? [];
		own.push(task);
		this.#byUser.set(userId, own);
		return task.id;
	}

	getAllTasks(userId: number): string[] {
		return this.#pending(userId, () => true);
	}

	getTasksForTag(userId: number, tag: string): string[] {
		return this.#pending(userId, (task) => task.tags.has(tag));
	}

	completeTask(userId: number, taskId: number): void {
		const task = this.#tasks[taskId - 1];
		if (task?.userId === userId) task.done = true;
	}

	#pending(userId: number, keep: (task: Task) => boolean): string[] {
		return (this.#byUser.get(userId) ?? [])
			.filter((task) => !task.done && keep(task))
			.sort((a, b) => a.dueDate - b.dueDate)
			.map((task) => task.description);
	}
}
