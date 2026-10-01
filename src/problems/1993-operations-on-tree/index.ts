/**
 * 1993. Operations on Tree
 *
 * Supports locking and unlocking tree nodes per user, and upgrading: lock
 * an unlocked node with no locked ancestors but some locked descendant,
 * unlocking all its descendants.
 *
 * Store each node's locking user. Lock and unlock are constant time;
 * upgrade walks the ancestors, then the subtree (explicit stack).
 *
 * @see https://leetcode.com/problems/operations-on-tree/
 * @difficulty Medium
 * @timeComplexity O(1) per lock or unlock, O(n) per upgrade
 * @spaceComplexity O(n)
 *
 * @example
 * const tree = new OperationsOnTree([-1, 0, 0, 1, 1, 2, 2]);
 * tree.lock(2, 2); // true
 * tree.unlock(2, 3); // false
 */
export class OperationsOnTree {
	readonly #parent: readonly number[];
	readonly #children: number[][];
	readonly #lockedBy: number[];

	constructor(parent: readonly number[]) {
		this.#parent = parent;
		this.#children = parent.map(() => []);
		for (const [node, p] of parent.entries())
			if (p !== -1) this.#children[p]?.push(node);
		this.#lockedBy = parent.map(() => 0);
	}

	lock(num: number, user: number): boolean {
		if (this.#lockedBy[num]) return false;
		this.#lockedBy[num] = user;
		return true;
	}

	unlock(num: number, user: number): boolean {
		if (this.#lockedBy[num] !== user) return false;
		this.#lockedBy[num] = 0;
		return true;
	}

	upgrade(num: number, user: number): boolean {
		if (this.#lockedBy[num]) return false;
		for (
			let node = this.#parent[num] ?? -1;
			node !== -1;
			node = this.#parent[node] ?? -1
		) {
			if (this.#lockedBy[node]) return false;
		}
		let unlocked = false;
		const stack = [...(this.#children[num] ?? [])];
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			if (this.#lockedBy[node]) {
				this.#lockedBy[node] = 0;
				unlocked = true;
			}
			stack.push(...(this.#children[node] ?? []));
		}
		if (unlocked) this.#lockedBy[num] = user;
		return unlocked;
	}
}
