import { describe, expect, it } from "bun:test";
import { parallelExecutionOfPromisesForIndividualResultsRetrieval as allSettled } from ".";

describe("2795. Parallel Execution of Promises for Individual Results Retrieval", () => {
	const after =
		<T>(ms: number, value: T, fail = false) =>
		() =>
			new Promise<unknown>((resolve, reject) =>
				setTimeout(() => (fail ? reject(value) : resolve(value)), ms),
			);

	it("solves the examples from the problem statement", async () => {
		expect(await allSettled([after(10, 15)])).toEqual([
			{ status: "fulfilled", value: 15 },
		]);
		expect(await allSettled([after(20, 20), after(10, 15)])).toEqual([
			{ status: "fulfilled", value: 20 },
			{ status: "fulfilled", value: 15 },
		]);
		expect(
			await allSettled([after(30, 30), after(5, "Error", true), after(10, 15)]),
		).toEqual([
			{ status: "fulfilled", value: 30 },
			{ status: "rejected", reason: "Error" },
			{ status: "fulfilled", value: 15 },
		]);
	});

	it("resolves at once with no functions", async () => {
		expect(await allSettled([])).toEqual([]);
	});
});
