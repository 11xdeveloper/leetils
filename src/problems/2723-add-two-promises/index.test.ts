import { describe, expect, it } from "bun:test";
import { addTwoPromises } from ".";

describe("2723. Add Two Promises", () => {
	const after = (value: number, ms: number) =>
		new Promise<number>((resolve) => setTimeout(() => resolve(value), ms));

	it("solves the examples from the problem statement", async () => {
		expect(await addTwoPromises(after(2, 20), after(5, 60))).toBe(7);
		expect(await addTwoPromises(after(10, 50), after(-12, 30))).toBe(-2);
	});
});
