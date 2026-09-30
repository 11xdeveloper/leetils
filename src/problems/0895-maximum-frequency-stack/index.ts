/**
 * 895. Maximum Frequency Stack
 *
 * A stack where `pop` removes and returns the most frequent element, the
 * one nearest the top among ties.
 *
 * Tracks each value's frequency, and keeps a stack of pushes for each
 * frequency: the `f`th copy of a value goes on stack `f`. Popping takes
 * from the highest non-empty stack, whose top is the most recent push at
 * the highest frequency.
 *
 * @see https://leetcode.com/problems/maximum-frequency-stack/
 * @difficulty Hard
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const stack = new MaximumFrequencyStack();
 * for (const val of [5, 7, 5, 7, 4, 5]) stack.push(val);
 * stack.pop(); // 5
 * stack.pop(); // 7
 */
export class MaximumFrequencyStack {
	readonly #frequency = new Map<number, number>();
	readonly #stacks: number[][] = [];

	push(val: number): void {
		const frequency = (this.#frequency.get(val) ?? 0) + 1;
		this.#frequency.set(val, frequency);
		const stack = this.#stacks[frequency - 1];
		if (stack) stack.push(val);
		else this.#stacks.push([val]);
	}

	pop(): number {
		const stack = this.#stacks.at(-1) ?? [];
		const val = stack.pop() ?? 0;
		if (stack.length === 0) this.#stacks.pop();
		this.#frequency.set(val, (this.#frequency.get(val) ?? 1) - 1);
		return val;
	}
}
