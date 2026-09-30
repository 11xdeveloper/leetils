import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MaxStack } from ".";

describe("716. Max Stack", () => {
	it("solves the example from the problem statement", () => {
		const stack = new MaxStack();
		stack.push(5);
		stack.push(1);
		stack.push(5);
		expect(stack.top()).toBe(5);
		expect(stack.popMax()).toBe(5);
		expect(stack.top()).toBe(1);
		expect(stack.peekMax()).toBe(5);
		expect(stack.pop()).toBe(1);
		expect(stack.top()).toBe(5);
	});

	it("matches an array on random operations", () => {
		const random = createRandom(716);
		for (let run = 0; run < 100; run++) {
			const stack = new MaxStack();
			const reference: number[] = [];
			for (let op = 0; op < 200; op++) {
				const action = reference.length === 0 ? 0 : random.int(0, 4);
				if (action === 0) {
					const x = random.int(-5, 5);
					stack.push(x);
					reference.push(x);
				} else if (action === 1) {
					expect(stack.pop()).toBe(reference.pop() ?? 0);
				} else if (action === 2) {
					expect(stack.top()).toBe(reference.at(-1) ?? 0);
				} else if (action === 3) {
					expect(stack.peekMax()).toBe(Math.max(...reference));
				} else {
					const max = Math.max(...reference);
					reference.splice(reference.lastIndexOf(max), 1);
					expect(stack.popMax()).toBe(max);
				}
			}
		}
	});
});
