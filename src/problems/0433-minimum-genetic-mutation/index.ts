/**
 * 433. Minimum Genetic Mutation
 *
 * Genes are 8-character strings of A, C, G and T. A mutation changes one
 * character, and every gene along the way must be in `bank`. Returns the
 * fewest mutations from `startGene` to `endGene`, or -1 if it can't be done.
 *
 * Breadth-first search over genes, trying each of the 3 other letters at
 * each of the 8 positions.
 *
 * @see https://leetcode.com/problems/minimum-genetic-mutation/
 * @difficulty Medium
 * @timeComplexity O(b) where b is the size of the bank, with 24 neighbours per gene
 * @spaceComplexity O(b)
 *
 * @example
 * minimumGeneticMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"]); // 2
 */
export const minimumGeneticMutation = (
	startGene: string,
	endGene: string,
	bank: readonly string[],
): number => {
	const unvisited = new Set(bank);
	let level = [startGene];

	for (let mutations = 0; level.length > 0; mutations++) {
		const next: string[] = [];
		for (const gene of level) {
			if (gene === endGene) return mutations;
			for (let i = 0; i < gene.length; i++) {
				for (const letter of "ACGT") {
					const mutated = gene.slice(0, i) + letter + gene.slice(i + 1);
					if (unvisited.delete(mutated)) next.push(mutated);
				}
			}
		}
		level = next;
	}

	return -1;
};
