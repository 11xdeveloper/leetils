export default (nums: number[], target: number) => {
    const solutions: [number, number][] = [];
    const complements = new Map<number, number>();

    for (const num of nums) {
        const complement = target - num;
        if (complements.has(complement)) solutions.push([complement, num]);
        complements.set(num, complement);
    }

    return solutions;
};
