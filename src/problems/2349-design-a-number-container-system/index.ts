import { Heap } from "../../internal/heap";

/**
 * 2349. Design a Number Container System
 *
 * Containers at indices hold numbers, replaced by `change`. `find` returns
 * the smallest index holding a number, or -1.
 *
 * Keep each index's number, and a min-heap of indices per number; an
 * index whose number has since changed is dropped lazily.
 *
 * @see https://leetcode.com/problems/design-a-number-container-system/
 * @difficulty Medium
 * @timeComplexity O(log n) amortised per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const containers = new DesignANumberContainerSystem();
 * containers.change(2, 10);
 * containers.find(10); // 2
 */
export class DesignANumberContainerSystem {
	readonly #numberAt = new Map<number, number>();
	readonly #indices = new Map<number, Heap<number>>();

	change(index: number, number: number): void {
		this.#numberAt.set(index, number);
		let heap = this.#indices.get(number);
		if (!heap) {
			heap = new Heap<number>((a, b) => a - b);
			this.#indices.set(number, heap);
		}
		heap.push(index);
	}

	find(number: number): number {
		const heap = this.#indices.get(number);
		for (let index = heap?.peek(); index !== undefined; index = heap?.peek()) {
			if (this.#numberAt.get(index) === number) return index;
			heap?.pop();
		}
		return -1;
	}
}
