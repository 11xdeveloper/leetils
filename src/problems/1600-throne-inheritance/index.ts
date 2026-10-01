/**
 * 1600. Throne Inheritance
 *
 * Tracks a royal family: `birth(parent, child)`, `death(name)` and
 * `getInheritanceOrder()`, which lists the living in order of succession.
 *
 * The order of succession is a preorder walk of the family tree, children
 * oldest first. Deaths are just marked, and skipped when listing.
 *
 * @see https://leetcode.com/problems/throne-inheritance/
 * @difficulty Medium
 * @timeComplexity O(1) per birth and death, O(n) per order
 * @spaceComplexity O(n)
 *
 * @example
 * const kingdom = new ThroneInheritance("king");
 * kingdom.birth("king", "andy");
 * kingdom.death("king");
 * kingdom.getInheritanceOrder(); // ["andy"]
 */
export class ThroneInheritance {
	readonly #king: string;
	readonly #children = new Map<string, string[]>();
	readonly #dead = new Set<string>();

	constructor(kingName: string) {
		this.#king = kingName;
	}

	birth(parentName: string, childName: string): void {
		const children = this.#children.get(parentName);
		if (children) children.push(childName);
		else this.#children.set(parentName, [childName]);
	}

	death(name: string): void {
		this.#dead.add(name);
	}

	getInheritanceOrder(): string[] {
		const order: string[] = [];
		const stack = [this.#king];
		for (let name = stack.pop(); name !== undefined; name = stack.pop()) {
			if (!this.#dead.has(name)) order.push(name);
			const children = this.#children.get(name) ?? [];
			for (let i = children.length - 1; i >= 0; i--)
				stack.push(children[i] ?? "");
		}
		return order;
	}
}
