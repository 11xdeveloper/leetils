import { Heap } from "../../internal/heap";

/**
 * 3885. Design Event Manager
 *
 * Track events by priority: update an active event's priority, or remove
 * and return the highest-priority one (the smallest id on ties), or -1.
 *
 * A heap of (priority, id) entries, with each event's current priority in
 * a map; outdated entries are skipped when they reach the top.
 *
 * @see https://leetcode.com/problems/design-event-manager/
 * @difficulty Medium
 * @timeComplexity O(log n) per operation, amortised
 * @spaceComplexity O(n)
 *
 * @example
 * const manager = new DesignEventManager([[5, 7], [2, 7], [9, 4]]);
 * manager.pollHighest(); // 2
 * manager.updatePriority(9, 7);
 * manager.pollHighest(); // 5
 */
export class DesignEventManager {
	readonly #priority = new Map<number, number>();
	readonly #heap = new Heap<[priority: number, id: number]>(
		(a, b) => b[0] - a[0] || a[1] - b[1],
	);

	constructor(events: readonly (readonly number[])[]) {
		for (const [id = 0, priority = 0] of events)
			this.updatePriority(id, priority);
	}

	updatePriority(eventId: number, newPriority: number): void {
		this.#priority.set(eventId, newPriority);
		this.#heap.push([newPriority, eventId]);
	}

	pollHighest(): number {
		while (this.#heap.size > 0) {
			const [priority, id] = this.#heap.pop() ?? [0, 0];
			if (this.#priority.get(id) !== priority) continue;
			this.#priority.delete(id);
			return id;
		}
		return -1;
	}
}
