import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { reorderList } from ".";

const reorder = (values: number[]): number[] => {
	const head = listFromArray(values);
	expect(reorderList(head)).toBeUndefined();
	return listToArray(head);
};

const byArray = (values: number[]): number[] => {
	const result: number[] = [];
	for (let i = 0, j = values.length - 1; i <= j; i++, j--) {
		result.push(values[i] ?? 0);
		if (i !== j) result.push(values[j] ?? 0);
	}
	return result;
};

describe("143. Reorder List", () => {
	it("solves the examples from the problem statement", () => {
		expect(reorder([1, 2, 3, 4])).toEqual([1, 4, 2, 3]);
		expect(reorder([1, 2, 3, 4, 5])).toEqual([1, 5, 2, 4, 3]);
	});

	it("handles one and two nodes", () => {
		expect(reorder([1])).toEqual([1]);
		expect(reorder([1, 2])).toEqual([1, 2]);
		expect(() => reorderList(null)).not.toThrow();
	});

	it("matches alternating from both ends of an array, for every length up to 30", () => {
		for (let n = 1; n <= 30; n++) {
			const values = Array.from({ length: n }, (_, i) => i + 1);
			expect(reorder(values)).toEqual(byArray(values));
		}
	});
});
