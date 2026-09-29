/**
 * 677. Map Sum Pairs
 *
 * A map from strings to numbers. `insert` sets a key's value, replacing any
 * old one, and `sum` returns the total of the values whose keys start with
 * a prefix.
 *
 * A trie where each node stores the total of the values below it. Inserting
 * adds the change in the key's value along its path, so `sum` just reads
 * the prefix's node.
 *
 * @see https://leetcode.com/problems/map-sum-pairs/
 * @difficulty Medium
 * @timeComplexity O(key length) per operation
 * @spaceComplexity O(total length of the keys)
 *
 * @example
 * const map = new MapSumPairs();
 * map.insert("apple", 3);
 * map.insert("app", 2);
 * map.sum("ap"); // 5
 */
export class MapSumPairs {
	readonly #values = new Map<string, number>();
	readonly #root: TrieNode = { total: 0, children: new Map() };

	insert(key: string, val: number): void {
		const delta = val - (this.#values.get(key) ?? 0);
		this.#values.set(key, val);
		let node = this.#root;
		node.total += delta;
		for (const char of key) {
			let child = node.children.get(char);
			if (!child) {
				child = { total: 0, children: new Map() };
				node.children.set(char, child);
			}
			child.total += delta;
			node = child;
		}
	}

	sum(prefix: string): number {
		let node: TrieNode | undefined = this.#root;
		for (const char of prefix) node = node?.children.get(char);
		return node?.total ?? 0;
	}
}

interface TrieNode {
	total: number;
	children: Map<string, TrieNode>;
}
