import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "../../testing/clock";
import { QueryBatching } from ".";

describe("2756. Query Batching", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const wait = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	const run = async (
		queryMultiple: (keys: string[]) => Promise<string[]>,
		t: number,
		calls: [key: string, time: number][],
	) => {
		const clock = new FakeClock();
		const batcher = new QueryBatching(queryMultiple, t);
		const results: unknown[] = calls.map(() => undefined);
		for (const [i, [key, time]] of calls.entries())
			setTimeout(() => {
				batcher.getValue(key).then(
					(resolved) => {
						results[i] = { resolved, time: clock.now };
					},
					(rejected) => {
						results[i] = { rejected, time: clock.now };
					},
				);
			}, time);
		await clock.advanceTo(1000);
		return results;
	};

	it("solves the examples from the problem statement", async () => {
		const calls: [string, number][] = [
			["a", 10],
			["b", 20],
			["c", 30],
		];
		expect(
			await run(async (keys) => keys.map((key) => `${key}!`), 100, calls),
		).toEqual([
			{ resolved: "a!", time: 10 },
			{ resolved: "b!", time: 110 },
			{ resolved: "c!", time: 110 },
		]);
		expect(
			await run(
				async (keys) => {
					await wait(100);
					return keys.map((key) => `${key}!`);
				},
				100,
				calls,
			),
		).toEqual([
			{ resolved: "a!", time: 110 },
			{ resolved: "b!", time: 210 },
			{ resolved: "c!", time: 210 },
		]);
		expect(
			await run(
				async (keys) => {
					await wait(keys.length * 75);
					return keys.map((key) => `${key}!`);
				},
				100,
				[
					["a", 10],
					["b", 20],
					["c", 30],
					["d", 40],
					["e", 250],
					["f", 300],
				],
			),
		).toEqual([
			{ resolved: "a!", time: 85 },
			{ resolved: "b!", time: 335 },
			{ resolved: "c!", time: 335 },
			{ resolved: "d!", time: 335 },
			{ resolved: "e!", time: 325 },
			{ resolved: "f!", time: 425 },
		]);
	});

	it("rejects every key in a failed batch", async () => {
		expect(
			await run(
				async (keys) => {
					if (keys.includes("b")) throw "Error!";
					return keys;
				},
				50,
				[
					["a", 5],
					["b", 15],
					["c", 25],
				],
			),
		).toEqual([
			{ resolved: "a", time: 5 },
			{ rejected: "Error!", time: 55 },
			{ rejected: "Error!", time: 55 },
		]);
	});
});
