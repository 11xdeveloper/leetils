import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfNAndItsDoubleExist as checkIfExist } from ".";

describe("1346. Check If N and Its Double Exist", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkIfExist([10, 2, 5, 3])).toBeTrue();
		expect(checkIfExist([3, 1, 7, 11])).toBeFalse();
	});

	it("needs two zeros for zero to count", () => {
		expect(checkIfExist([0, 1])).toBeFalse();
		expect(checkIfExist([0, 0])).toBeTrue();
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1346);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(2, 8), -10, 10);
			expect(checkIfExist(arr)).toBe(
				arr.some((a, i) => arr.some((b, j) => i !== j && a === 2 * b)),
			);
		}
	});
});
