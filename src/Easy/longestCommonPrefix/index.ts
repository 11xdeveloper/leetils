export default (words: string[]) => {
    if (words.length == 0) return '';
    if (words.length < 2) return words[0];

    const minLen = words.reduce(
        (min, word) => Math.min(min, word.length),
        Infinity
    );

    if (minLen === 0) return '';

    for (let i = minLen; i > 0; i--) {
        const prefix = words[0]!.slice(0, i);
        if (words.every((str) => str.slice(0, i) === prefix)) return prefix;
    }

    return '';
};
