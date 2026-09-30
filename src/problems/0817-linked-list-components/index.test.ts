import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { linkedListComponents as numComponents } from ".";

describe("817. Linked List Components", () => {
	it("solves the examples from the problem statement", () => {
		expect(numComponents(listFromArray([0, 1, 2, 3]), [0, 1, 3])).toBe(2);
		expect(numComponents(listFromArray([0, 1, 2, 3, 4]), [0, 3, 1, 4])).toBe(2);
	});

	it("matches splitting a marked string on random inputs", () => {
		const random = createRandom(817);
		for (let run = 0; run < 1000; run++) {
			const values = Array.from(
				{ length: random.int(1, 12) },
				(_, i) => i,
			).sort(() => random.next() - 0.5);
			const nums = values.filter(() => random.int(0, 1) === 1);
			const marks = values
				.map((value) => (nums.includes(value) ? "1" : "0"))
				.join("");
			expect(numComponents(listFromArray(values), nums)).toBe(
				marks.split("0").filter((run) => run !== "").length,
			);
		}
	});
});
