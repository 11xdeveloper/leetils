import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ImplementStackUsingQueues } from ".";

describe("225. Implement Stack using Queues", () => {
	it("solves the example from the problem statement", () => {
		const stack = new ImplementStackUsingQueues();
		stack.push(1);
		stack.push(2);
		expect(stack.top()).toBe(2);
		expect(stack.pop()).toBe(2);
		expect(stack.empty()).toBeFalse();
	});

	it("matches an array used as a stack on random operations", () => {
		const random = createRandom(225);
		for (let run = 0; run < 100; run++) {
			const stack = new ImplementStackUsingQueues();
			const reference: number[] = [];
			for (let step = 0; step < 100; step++) {
				const action =
					reference.length === 0
						? "push"
						: (["push", "pop", "top"] as const)[random.int(0, 2)];
				if (action === "push") {
					const value = random.int(1, 9);
					stack.push(value);
					reference.push(value);
				} else if (action === "pop") {
					expect(stack.pop()).toBe(reference.pop() ?? 0);
				} else {
					expect(stack.top()).toBe(reference.at(-1) ?? 0);
				}
				expect(stack.empty()).toBe(reference.length === 0);
			}
		}
	});
});
