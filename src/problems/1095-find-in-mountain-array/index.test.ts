import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findInMountainArray } from ".";

const mountain = (values: number[]) => {
	const reader = {
		calls: 0,
		get: (i: number) => {
			reader.calls++;
			return values[i] ?? 0;
		},
		length: () => values.length,
	};
	return reader;
};

describe("1095. Find in Mountain Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findInMountainArray(3, mountain([1, 2, 3, 4, 5, 3, 1]))).toBe(2);
		expect(findInMountainArray(3, mountain([0, 1, 2, 4, 2, 1]))).toBe(-1);
	});

	it("finds the smallest index of every value within 100 reads on random mountains", () => {
		const random = createRandom(1095);
		for (let run = 0; run < 200; run++) {
			const rise = [
				...new Set(random.array(random.int(1, 5000), 0, 10 ** 6)),
			].sort((a, b) => a - b);
			const fall = [
				...new Set(
					random.array(random.int(1, 5000), 0, (rise.at(-1) ?? 1) - 1),
				),
			].sort((a, b) => b - a);
			const values = [...rise, ...fall];
			for (const target of [
				values[random.int(0, values.length - 1)] ?? 0,
				random.int(0, 10 ** 6),
			]) {
				const reader = mountain(values);
				expect(findInMountainArray(target, reader)).toBe(
					values.indexOf(target),
				);
				expect(reader.calls).toBeLessThanOrEqual(100);
			}
		}
	});
});
