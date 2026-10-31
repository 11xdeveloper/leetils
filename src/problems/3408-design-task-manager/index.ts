import { Heap } from "../../internal/heap";

/**
 * 3408. Design Task Manager
 *
 * Manage tasks `[userId, taskId, priority]`: add, edit a task's priority,
 * remove a task, and `execTop`, which removes the highest-priority task
 * (the highest task ID on a tie) and returns its user, or -1.
 *
 * Keep each task's current user and priority, and a heap of (priority,
 * task) snapshots; stale snapshots are skipped when they reach the top.
 *
 * @see https://leetcode.com/problems/design-task-manager/
 * @difficulty Medium
 * @timeComplexity O(log n) per operation, amortised
 * @spaceComplexity O(n)
 *
 * @example
 * const manager = new DesignTaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]);
 * manager.execTop(); // 2
 */
export class DesignTaskManager {
	readonly #tasks = new Map<number, [userId: number, priority: number]>();
	readonly #queue = new Heap<[priority: number, taskId: number]>(
		(a, b) => b[0] - a[0] || b[1] - a[1],
	);

	constructor(tasks: readonly (readonly number[])[]) {
		for (const [userId = 0, taskId = 0, priority = 0] of tasks)
			this.add(userId, taskId, priority);
	}

	add(userId: number, taskId: number, priority: number): void {
		this.#tasks.set(taskId, [userId, priority]);
		this.#queue.push([priority, taskId]);
	}

	edit(taskId: number, newPriority: number): void {
		const task = this.#tasks.get(taskId);
		if (task) this.add(task[0], taskId, newPriority);
	}

	rmv(taskId: number): void {
		this.#tasks.delete(taskId);
	}

	execTop(): number {
		for (let top = this.#queue.pop(); top; top = this.#queue.pop()) {
			const [priority, taskId] = top;
			const task = this.#tasks.get(taskId);
			if (!task || task[1] !== priority) continue;
			this.#tasks.delete(taskId);
			return task[0];
		}
		return -1;
	}
}
