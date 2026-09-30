import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { openTheLock } from ".";

/** With no dead ends, each wheel needs the shorter way round. */
const unobstructed = (target: string): number =>
	[...target].reduce(
		(total, digit) => total + Math.min(Number(digit), 10 - Number(digit)),
		0,
	);

describe("752. Open the Lock", () => {
	it("solves the examples from the problem statement", () => {
		expect(openTheLock(["0201", "0101", "0102", "1212", "2002"], "0202")).toBe(
			6,
		);
		expect(openTheLock(["8888"], "0009")).toBe(1);
		expect(
			openTheLock(
				["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],
				"8888",
			),
		).toBe(-1);
	});

	it("returns -1 when the start is a dead end", () => {
		expect(openTheLock(["0000"], "8888")).toBe(-1);
	});

	it("matches the shortest turns on every wheel when nothing is blocked", () => {
		const random = createRandom(752);
		for (let run = 0; run < 100; run++) {
			const target = random.string(4, "0123456789");
			expect(openTheLock([], target)).toBe(unobstructed(target));
		}
	});
});
