import { describe, expect, it } from "bun:test";
import { sleep } from ".";

describe("2621. Sleep", () => {
	it("solves the examples from the problem statement", async () => {
		const start = performance.now();
		await sleep(20);
		expect(performance.now() - start).toBeGreaterThanOrEqual(15);
	});

	it("resolves to undefined", async () => {
		expect(await sleep(0)).toBeUndefined();
	});
});
