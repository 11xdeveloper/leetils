/** Seeded pseudo-random values for tests, so failures are reproducible. */
export interface Random {
	/** A float in [0, 1). */
	next(): number;
	/** An integer in [min, max]. */
	int(min: number, max: number): number;
	/** An array of `length` integers in [min, max]. */
	array(length: number, min: number, max: number): number[];
	/** A string of `length` characters from `alphabet`. */
	string(length: number, alphabet: string): string;
}

/** Creates a seeded generator using the mulberry32 algorithm. */
export const createRandom = (seed: number): Random => {
	let state = seed >>> 0;

	const next = (): number => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
	};
	const int = (min: number, max: number): number =>
		min + Math.floor(next() * (max - min + 1));

	return {
		next,
		int,
		array: (length, min, max) => Array.from({ length }, () => int(min, max)),
		string: (length, alphabet) =>
			Array.from({ length }, () =>
				alphabet.charAt(int(0, alphabet.length - 1)),
			).join(""),
	};
};

/** Every string of characters from `alphabet` up to `maxLength` long, shortest first. */
export const stringsUpTo = (
	alphabet: readonly string[],
	maxLength: number,
): string[] => {
	const all = [""];
	let previous = [""];
	for (let length = 1; length <= maxLength; length++) {
		previous = previous.flatMap((s) => alphabet.map((char) => s + char));
		all.push(...previous);
	}
	return all;
};
