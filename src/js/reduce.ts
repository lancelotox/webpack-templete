export default function (...args: Array<number>) {
    return args.reduce((x, y)=> x + y);
}