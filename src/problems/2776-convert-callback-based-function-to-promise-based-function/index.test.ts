import { describe, expect, it } from "bun:test";
import { convertCallbackBasedFunctionToPromiseBasedFunction as promisify } from ".";

describe("2776. Convert Callback Based Function to Promise Based Function", () => {
	it("solves the examples from the problem statement", async () => {
		const sum = promisify(
			(callback: (data: number) => void, a: number, b: number, c: number) =>
				callback(a * b * c),
		);
		expect(await sum(1, 2, 3)).toBe(6);

		const failing = promisify(
			(
				callback: (data: number, error?: unknown) => void,
				a: number,
				b: number,
				c: number,
			) => callback(a * b * c, "Promise Rejected"),
		);
		expect(failing(4, 5, 6)).rejects.toBe("Promise Rejected");
	});

	it("waits for asynchronous callbacks", async () => {
		const later = promisify((callback: (data: string) => void, value: string) =>
			setTimeout(() => callback(value), 5),
		);
		expect(await later("done")).toBe("done");
	});
});
