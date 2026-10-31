/**
 * 2502. Design Memory Allocator
 *
 * A memory of `n` units. `allocate` claims the leftmost run of `size` free
 * units for an id and returns its start, or -1. `freeMemory` frees every
 * unit held by an id and returns how many there were.
 *
 * Keep the owner of each unit and scan; `n` and the number of calls are
 * small.
 *
 * @see https://leetcode.com/problems/design-memory-allocator/
 * @difficulty Medium
 * @timeComplexity O(n) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const allocator = new DesignMemoryAllocator(10);
 * allocator.allocate(1, 1); // 0
 * allocator.freeMemory(1); // 1
 */
export class DesignMemoryAllocator {
	readonly #owners: number[];

	constructor(n: number) {
		this.#owners = Array.from({ length: n }, () => 0);
	}

	allocate(size: number, mID: number): number {
		let run = 0;
		for (let i = 0; i < this.#owners.length; i++) {
			run = this.#owners[i] === 0 ? run + 1 : 0;
			if (run === size) {
				this.#owners.fill(mID, i - size + 1, i + 1);
				return i - size + 1;
			}
		}
		return -1;
	}

	freeMemory(mID: number): number {
		let freed = 0;
		for (let i = 0; i < this.#owners.length; i++)
			if (this.#owners[i] === mID) {
				this.#owners[i] = 0;
				freed++;
			}
		return freed;
	}
}
