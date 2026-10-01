import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfStudentsUnableToEatLunch as countStudents } from ".";

/** Simulates the queue until a full pass makes no progress. */
const bySimulation = (students: number[], sandwiches: number[]): number => {
	const queue = [...students];
	const stack = [...sandwiches];
	let refusals = 0;
	while (queue.length > 0 && refusals < queue.length) {
		const student = queue.shift() ?? 0;
		if (student === stack[0]) {
			stack.shift();
			refusals = 0;
		} else {
			queue.push(student);
			refusals++;
		}
	}
	return queue.length;
};

describe("1700. Number of Students Unable to Eat Lunch", () => {
	it("solves the examples from the problem statement", () => {
		expect(countStudents([1, 1, 0, 0], [0, 1, 0, 1])).toBe(0);
		expect(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1])).toBe(3);
	});

	it("matches simulating the queue on random inputs", () => {
		const random = createRandom(1700);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const [students, sandwiches] = [
				random.array(n, 0, 1),
				random.array(n, 0, 1),
			];
			expect(countStudents(students, sandwiches)).toBe(
				bySimulation(students, sandwiches),
			);
		}
	});
});
