import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { readNCharactersGivenRead4 } from ".";

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

const read = (file: string, n: number): [count: number, contents: string] => {
	const buf: string[] = [];
	const count = readNCharactersGivenRead4(read4Over(file))(buf, n);
	return [count, buf.slice(0, count).join("")];
};

describe("157. Read N Characters Given Read4", () => {
	it("solves the examples from the problem statement", () => {
		expect(read("abc", 4)).toEqual([3, "abc"]);
		expect(read("abcde", 5)).toEqual([5, "abcde"]);
		expect(read("abcdABCD1234", 12)).toEqual([12, "abcdABCD1234"]);
	});

	it("stops after n characters, part-way through a batch", () => {
		expect(read("abcdefgh", 5)).toEqual([5, "abcde"]);
	});

	it("matches slicing the file on random inputs", () => {
		const random = createRandom(157);
		for (let run = 0; run < 500; run++) {
			const file = random.string(random.int(1, 30), "ab12");
			const n = random.int(1, 40);
			expect(read(file, n)).toEqual([
				Math.min(n, file.length),
				file.slice(0, n),
			]);
		}
	});
});
