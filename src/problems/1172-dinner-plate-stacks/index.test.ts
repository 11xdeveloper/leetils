import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DinnerPlateStacks as DinnerPlates } from ".";

/** Scans the stacks directly for every operation. */
class Reference {
	readonly stacks: number[][] = [];
	constructor(readonly capacity: number) {}

	push(val: number) {
		const stack = this.stacks.find((s) => s.length < this.capacity);
		if (stack) stack.push(val);
		else this.stacks.push([val]);
	}

	pop() {
		for (let i = this.stacks.length - 1; i >= 0; i--) {
			const value = this.stacks[i]?.pop();
			if (value !== undefined) return value;
		}
		return -1;
	}

	popAtStack(index: number) {
		return this.stacks[index]?.pop() ?? -1;
	}
}

describe("1172. Dinner Plate Stacks", () => {
	it("solves the example from the problem statement", () => {
		const plates = new DinnerPlates(2);
		for (const value of [1, 2, 3, 4, 5]) plates.push(value);
		expect(plates.popAtStack(0)).toBe(2);
		plates.push(20);
		plates.push(21);
		expect(plates.popAtStack(0)).toBe(20);
		expect(plates.popAtStack(2)).toBe(21);
		expect([1, 2, 3, 4, 5].map(() => plates.pop())).toEqual([5, 4, 3, 1, -1]);
	});

	it("handles stacks that hold one plate", () => {
		const plates = new DinnerPlates(1);
		plates.push(1);
		plates.push(2);
		expect(plates.popAtStack(0)).toBe(1);
		plates.push(3);
		expect(plates.popAtStack(0)).toBe(3);
		expect(plates.popAtStack(5)).toBe(-1);
		expect(plates.pop()).toBe(2);
		expect(plates.pop()).toBe(-1);
	});

	it("matches scanning the stacks on random operations", () => {
		const random = createRandom(1172);
		for (let run = 0; run < 200; run++) {
			const capacity = random.int(1, 3);
			const plates = new DinnerPlates(capacity);
			const reference = new Reference(capacity);
			for (let op = 0; op < 80; op++) {
				const kind = random.int(0, 3);
				if (kind <= 1) {
					const value = random.int(1, 100);
					plates.push(value);
					reference.push(value);
				} else if (kind === 2) {
					expect(plates.pop()).toBe(reference.pop());
				} else {
					const index = random.int(0, 8);
					expect(plates.popAtStack(index)).toBe(reference.popAtStack(index));
				}
			}
		}
	});
});
