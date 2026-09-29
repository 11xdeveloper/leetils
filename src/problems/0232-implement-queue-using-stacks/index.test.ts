import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ImplementQueueUsingStacks } from ".";

describe("232. Implement Queue using Stacks", () => {
	it("solves the example from the problem statement", () => {
		const queue = new ImplementQueueUsingStacks();
		queue.push(1);
		queue.push(2);
		expect(queue.peek()).toBe(1);
		expect(queue.pop()).toBe(1);
		expect(queue.empty()).toBeFalse();
	});

	it("keeps order when pushes and pops are interleaved", () => {
		const queue = new ImplementQueueUsingStacks();
		queue.push(1);
		queue.push(2);
		expect(queue.pop()).toBe(1);
		queue.push(3);
		expect(queue.pop()).toBe(2);
		expect(queue.pop()).toBe(3);
		expect(queue.empty()).toBeTrue();
	});

	it("matches an array used as a queue on random operations", () => {
		const random = createRandom(232);
		for (let run = 0; run < 100; run++) {
			const queue = new ImplementQueueUsingStacks();
			const reference: number[] = [];
			for (let step = 0; step < 100; step++) {
				const action =
					reference.length === 0
						? "push"
						: (["push", "pop", "peek"] as const)[random.int(0, 2)];
				if (action === "push") {
					const value = random.int(1, 9);
					queue.push(value);
					reference.push(value);
				} else if (action === "pop") {
					expect(queue.pop()).toBe(reference.shift() ?? 0);
				} else {
					expect(queue.peek()).toBe(reference[0] ?? 0);
				}
				expect(queue.empty()).toBe(reference.length === 0);
			}
		}
	});
});
