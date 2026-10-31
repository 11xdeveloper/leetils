import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { reverseNodesInEvenLengthGroups as reverseEvenGroups } from ".";

const reverse = (values: number[]): number[] =>
	listToArray(reverseEvenGroups(listFromArray(values)));

/** Reverses the groups of a plain array. */
const byArray = (values: number[]): number[] => {
	const result: number[] = [];
	for (let [start, size] = [0, 1]; start < values.length; start += size++) {
		const group = values.slice(start, start + size);
		result.push(...(group.length % 2 ? group : group.reverse()));
	}
	return result;
};

describe("2074. Reverse Nodes in Even Length Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverse([5, 2, 6, 3, 9, 1, 7, 3, 8, 4])).toEqual([
			5, 6, 2, 3, 9, 1, 4, 8, 3, 7,
		]);
		expect(reverse([1, 1, 0, 6])).toEqual([1, 0, 1, 6]);
		expect(reverse([1, 1, 0, 6, 5])).toEqual([1, 0, 1, 5, 6]);
	});

	it("matches reversing an array on lists of every length", () => {
		const random = createRandom(2074);
		for (let length = 0; length <= 30; length++) {
			const values = random.array(length, 0, 99);
			expect(reverse(values)).toEqual(byArray(values));
		}
	});
});
