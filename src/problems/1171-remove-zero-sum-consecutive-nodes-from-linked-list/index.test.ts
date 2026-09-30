import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { removeZeroSumConsecutiveNodesFromLinkedList as removeZeroSumSublists } from ".";

/** Every list reachable by deleting zero-sum runs until none are left. */
const finalLists = (values: number[]): Set<string> => {
	const finals = new Set<string>();
	const seen = new Set<string>();
	const explore = (list: number[]): void => {
		const key = list.join(",");
		if (seen.has(key)) return;
		seen.add(key);
		let deleted = false;
		for (let i = 0; i < list.length; i++) {
			let sum = 0;
			for (let j = i; j < list.length; j++) {
				sum += list[j] ?? 0;
				if (sum !== 0) continue;
				deleted = true;
				explore([...list.slice(0, i), ...list.slice(j + 1)]);
			}
		}
		if (!deleted) finals.add(key);
	};
	explore(values);
	return finals;
};

describe("1171. Remove Zero Sum Consecutive Nodes from Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(finalLists([1, 2, -3, 3, 1])).toContain(
			listToArray(removeZeroSumSublists(listFromArray([1, 2, -3, 3, 1]))).join(
				",",
			),
		);
		expect(
			listToArray(removeZeroSumSublists(listFromArray([1, 2, 3, -3, 4]))),
		).toEqual([1, 2, 4]);
		expect(
			listToArray(removeZeroSumSublists(listFromArray([1, 2, 3, -3, -2]))),
		).toEqual([1]);
	});

	it("can delete everything", () => {
		expect(removeZeroSumSublists(listFromArray([0]))).toBeNull();
		expect(removeZeroSumSublists(listFromArray([1, -1, 2, -2]))).toBeNull();
	});

	it("ends in a list reachable by repeated deletions on random inputs", () => {
		const random = createRandom(1171);
		for (let run = 0; run < 300; run++) {
			const values = random.array(random.int(1, 8), -3, 3);
			const result = listToArray(removeZeroSumSublists(listFromArray(values)));
			expect(finalLists(values)).toContain(result.join(","));
		}
	});
});
