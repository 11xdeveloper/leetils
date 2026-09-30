import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortItemsByGroupsRespectingDependencies as sortItems } from ".";

/** Whether `order` lists every item once, keeps groups together and respects dependencies. */
const isValid = (
	n: number,
	group: number[],
	before: number[][],
	order: number[],
): boolean => {
	if (order.length !== n || new Set(order).size !== n) return false;
	const position = new Map(order.map((item, i) => [item, i]));
	const dependenciesHold = before.every((firsts, item) =>
		firsts.every(
			(first) => (position.get(first) ?? 0) < (position.get(item) ?? 0),
		),
	);
	const finished = new Set<number>();
	for (let i = 0; i < n; i++) {
		const g = group[order[i] ?? 0] ?? -1;
		const previous = i > 0 ? (group[order[i - 1] ?? 0] ?? -1) : -1;
		if (g !== -1 && g !== previous && finished.has(g)) return false;
		if (previous !== -1 && previous !== g) finished.add(previous);
	}
	return dependenciesHold;
};

/** Whether any order is valid, trying every permutation. */
const anyValid = (n: number, group: number[], before: number[][]): boolean => {
	const order: number[] = [];
	const used = new Array<boolean>(n).fill(false);
	const extend = (): boolean => {
		if (order.length === n) return isValid(n, group, before, order);
		for (let item = 0; item < n; item++) {
			if (used[item]) continue;
			used[item] = true;
			order.push(item);
			if (extend()) return true;
			order.pop();
			used[item] = false;
		}
		return false;
	};
	return extend();
};

describe("1203. Sort Items by Groups Respecting Dependencies", () => {
	it("solves the examples from the problem statement", () => {
		const group = [-1, -1, 1, 0, 0, 1, 0, -1];
		const first = [[], [6], [5], [6], [3, 6], [], [], []];
		expect(isValid(8, group, first, sortItems(8, 2, group, first))).toBeTrue();
		expect(
			sortItems(8, 2, group, [[], [6], [5], [6], [3], [], [4], []]),
		).toEqual([]);
	});

	it("fails when groups depend on each other both ways", () => {
		// 0 and 2 are in group 0, 1 is in group 1: 0 → 1 → 2 splits group 0.
		expect(sortItems(3, 2, [0, 1, 0], [[], [0], [1]])).toEqual([]);
	});

	it("finds a valid order exactly when one exists on random inputs", () => {
		const random = createRandom(1203);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 6);
			const m = random.int(1, n);
			const group = Array.from({ length: n }, () => random.int(-1, m - 1));
			const before = Array.from({ length: n }, (_, item) =>
				[...new Set(random.array(random.int(0, 2), 0, n - 1))].filter(
					(other) => other !== item,
				),
			);
			const order = sortItems(n, m, group, before);
			if (order.length > 0) expect(isValid(n, group, before, order)).toBeTrue();
			else expect(anyValid(n, group, before)).toBeFalse();
		}
	});
});
