import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignAStackWithIncrementOperation as CustomStack } from ".";

describe("1381. Design a Stack With Increment Operation", () => {
	it("solves the example from the problem statement", () => {
		const stack = new CustomStack(3);
		stack.push(1);
		stack.push(2);
		expect(stack.pop()).toBe(2);
		stack.push(2);
		stack.push(3);
		stack.push(4);
		stack.increment(5, 100);
		stack.increment(2, 100);
		expect([stack.pop(), stack.pop(), stack.pop(), stack.pop()]).toEqual([
			103, 202, 201, -1,
		]);
	});

	it("matches an eager array on random operations", () => {
		const random = createRandom(1381);
		for (let run = 0; run < 100; run++) {
			const maxSize = random.int(1, 6);
			const stack = new CustomStack(maxSize);
			const reference: number[] = [];
			for (let op = 0; op < 60; op++) {
				const kind = random.int(0, 2);
				if (kind === 0) {
					const x = random.int(1, 50);
					stack.push(x);
					if (reference.length < maxSize) reference.push(x);
				} else if (kind === 1) {
					expect(stack.pop()).toBe(reference.pop() ?? -1);
				} else {
					const [k, val] = [random.int(1, 8), random.int(0, 20)];
					stack.increment(k, val);
					for (let i = 0; i < Math.min(k, reference.length); i++)
						reference[i] = (reference[i] ?? 0) + val;
				}
			}
		}
	});
});
