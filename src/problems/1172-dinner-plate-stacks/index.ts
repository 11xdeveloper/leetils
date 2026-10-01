import { Heap } from "../../internal/heap";

/**
 * 1172. Dinner Plate Stacks
 *
 * A row of stacks, each holding at most `capacity` plates. `push` adds to
 * the leftmost stack with room, `pop` takes from the rightmost non-empty
 * stack, and `popAtStack(index)` takes from a given stack; the pops return
 * -1 if there's nothing to take.
 *
 * A min-heap holds the indices of stacks with room, so `push` finds the
 * leftmost quickly. Empty stacks at the right end are dropped, which makes
 * `pop` a matter of taking from the last stack; heap entries past the end
 * are discarded when they reach the top.
 *
 * @see https://leetcode.com/problems/dinner-plate-stacks/
 * @difficulty Hard
 * @timeComplexity O(log n) per operation, amortised
 * @spaceComplexity O(n)
 *
 * @example
 * const plates = new DinnerPlateStacks(2);
 * for (const value of [1, 2, 3, 4, 5]) plates.push(value);
 * plates.popAtStack(0); // 2
 * plates.pop(); // 5
 */
export class DinnerPlateStacks {
	readonly #capacity: number;
	readonly #stacks: number[][] = [];
	readonly #withRoom = new Heap<number>((a, b) => a - b);
	readonly #inHeap = new Set<number>();

	constructor(capacity: number) {
		this.#capacity = capacity;
	}

	push(val: number): void {
		for (
			let top = this.#withRoom.peek();
			top !== undefined && top >= this.#stacks.length;
			top = this.#withRoom.peek()
		) {
			this.#withRoom.pop();
			this.#inHeap.delete(top);
		}
		const index = this.#withRoom.peek() ?? this.#stacks.length;
		const stack = this.#stacks[index];
		if (stack) stack.push(val);
		else this.#stacks.push([val]);
		const full = (this.#stacks[index]?.length ?? 0) >= this.#capacity;
		if (full && this.#inHeap.has(index)) {
			this.#withRoom.pop();
			this.#inHeap.delete(index);
		} else if (!full && !this.#inHeap.has(index)) {
			this.#withRoom.push(index);
			this.#inHeap.add(index);
		}
	}

	pop(): number {
		return this.popAtStack(this.#stacks.length - 1);
	}

	popAtStack(index: number): number {
		const stack = this.#stacks[index];
		const value = stack?.pop();
		if (value === undefined) return -1;
		if (!this.#inHeap.has(index)) {
			this.#withRoom.push(index);
			this.#inHeap.add(index);
		}
		while (this.#stacks.at(-1)?.length === 0) this.#stacks.pop();
		return value;
	}
}
