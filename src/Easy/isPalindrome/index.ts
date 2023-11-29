export default (num: number) =>
    ((s: string) => s.split('').reverse().join('') === s)(num.toString());
