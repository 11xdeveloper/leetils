import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MinStack } from ".";

describe("155. Min Stack", () => {
	it("solves the example from the problem statement", () => {
		const stack = new MinStack();
		stack.push(-2);
		stack.push(0);
		stack.push(-3);
		expect(stack.getMin()).toBe(-3);
		stack.pop();
		expect(stack.top()).toBe(0);
		expect(stack.getMin()).toBe(-2);
	});

	it("keeps the minimum when it is pushed more than once", () => {
		const stack = new MinStack();
		stack.push(1);
		stack.push(1);
		stack.pop();
		expect(stack.getMin()).toBe(1);
	});

	it("matches an array on random operations", () => {
		const random = createRandom(155);
		for (let run = 0; run < 100; run++) {
			const stack = new MinStack();
			const reference: number[] = [];
			for (let step = 0; step < 100; step++) {
				if (reference.length === 0 || random.int(0, 2) > 0) {
					const value = random.int(-(2 ** 31), 2 ** 31 - 1);
					stack.push(value);
					reference.push(value);
				} else {
					stack.pop();
					reference.pop();
				}
				if (reference.length > 0) {
					expect(stack.top()).toBe(reference.at(-1) ?? 0);
					expect(stack.getMin()).toBe(Math.min(...reference));
				}
			}
		}
	});
});
