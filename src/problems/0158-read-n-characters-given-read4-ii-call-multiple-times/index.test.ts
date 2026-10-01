import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { readNCharactersGivenRead4IICallMultipleTimes } from ".";

/** A read4 over `file`, with its own file pointer, as the problem describes. */
const read4Over = (file: string) => {
	let pointer = 0;
	return (buf4: string[]): number => {
		const chunk = file.slice(pointer, pointer + 4);
		pointer += chunk.length;
		for (const [i, char] of [...chunk].entries()) buf4[i] = char;
		return chunk.length;
	};
};

/** Runs a sequence of reads, returning what each one read. */
const readAll = (file: string, queries: number[]): string[] => {
	const read = readNCharactersGivenRead4IICallMultipleTimes(read4Over(file));
	return queries.map((n) => {
		const buf: string[] = [];
		const count = read(buf, n);
		return buf.slice(0, count).join("");
	});
};

describe("158. Read N Characters Given read4 II - Call Multiple Times", () => {
	it("solves the examples from the problem statement", () => {
		expect(readAll("abc", [1, 2, 1])).toEqual(["a", "bc", ""]);
		expect(readAll("abc", [4, 1])).toEqual(["abc", ""]);
	});

	it("keeps characters read4 fetched but a call didn't use", () => {
		expect(readAll("abcdefgh", [1, 1, 5, 1])).toEqual(["a", "b", "cdefg", "h"]);
	});

	it("matches slicing the file for random sequences of reads", () => {
		const random = createRandom(158);
		for (let run = 0; run < 500; run++) {
			const file = random.string(random.int(1, 30), "ab12");
			const queries = random.array(random.int(1, 10), 1, 8);
			let pointer = 0;
			const expected = queries.map((n) => {
				const chunk = file.slice(pointer, pointer + n);
				pointer += chunk.length;
				return chunk;
			});
			expect(readAll(file, queries)).toEqual(expected);
		}
	});
});
