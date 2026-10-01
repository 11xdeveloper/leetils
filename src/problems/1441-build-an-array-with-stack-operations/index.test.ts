import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { buildAnArrayWithStackOperations as buildArray } from ".";

/** Replays the operations against the stream and returns the stack. */
const replay = (operations: string[], n: number): number[] => {
	const stack: number[] = [];
	let next = 1;
	for (const operation of operations) {
		if (operation === "Push") {
			expect(next).toBeLessThanOrEqual(n);
			stack.push(next);
			next++;
		} else stack.pop();
	}
	return stack;
};

describe("1441. Build an Array With Stack Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(buildArray([1, 3], 3)).toEqual(["Push", "Push", "Pop", "Push"]);
		expect(buildArray([1, 2, 3], 3)).toEqual(["Push", "Push", "Push"]);
		expect(buildArray([1, 2], 4)).toEqual(["Push", "Push"]);
	});

	it("builds random targets", () => {
		const random = createRandom(1441);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 20);
			const target = [...new Set(random.array(random.int(1, n), 1, n))].sort(
				(a, b) => a - b,
			);
			const operations = buildArray(target, n);
			expect(replay(operations, n)).toEqual(target);
			expect(operations.at(-1)).toBe("Push");
		}
	});
});
