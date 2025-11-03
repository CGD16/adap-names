import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        // throw new Error("needs implementation or deletion");
        // this.components = source.slice();
        if (delimiter) {
            this.delimiter = delimiter;
        } 
        if (typeof (source as any) === "string") {
            this.components = (source as any).split(this.delimiter);
        } else {
            this.components = source.slice();
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        return this.components.join(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return this.delimiter;
    }

    public isEmpty(): boolean {
        // throw new Error("needs implementation or deletion");
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        // throw new Error("needs implementation or deletion");
        return this.components.length;
    }

    public getComponent(i: number): string {
        // throw new Error("needs implementation or deletion");
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        // throw new Error("needs implementation or deletion");
        this.components.push(c);
    }

    public remove(i: number): void {
        // throw new Error("needs implementation or deletion");
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

}