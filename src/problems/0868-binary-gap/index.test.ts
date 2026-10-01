import { describe, expect, it } from "bun:test";
import { binaryGap } from ".";

describe("868. Binary Gap", () => {
	it("solves the examples from the problem statement", () => {
		expect(binaryGap(22)).toBe(2);
		expect(binaryGap(8)).toBe(0);
		expect(binaryGap(5)).toBe(2);
	});

	it("matches measuring gaps in binary strings up to 10,000", () => {
		for (let n = 1; n <= 10_000; n++) {
			const ones = [...n.toString(2)].flatMap((bit, i) =>
				bit === "1" ? [i] : [],
			);
			const expected = Math.max(
				0,
				...ones.slice(1).map((position, i) => position - (ones[i] ?? 0)),
			);
			expect(binaryGap(n)).toBe(expected);
		}
	});
});
