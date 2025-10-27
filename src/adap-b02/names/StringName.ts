import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        // throw new Error("needs implementation or deletion");
        if (delimiter) {
            this.delimiter = delimiter;
        }
        this.name = source;
        this.noComponents = 1;
    }

    public asString(delimiter: string = this.delimiter): string {
        // throw new Error("needs implementation or deletion");
        return this.name;
    }

    public asDataString(): string {
        // throw new Error("needs implementation or deletion");
        return this.name;
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return this.delimiter;
    }

    public isEmpty(): boolean {
        // throw new Error("needs implementation or deletion");
        return this.name.length === 0;
    }

    public getNoComponents(): number {
        // throw new Error("needs implementation or deletion");
        return this.noComponents;
    }

    public getComponent(x: number): string {
        // throw new Error("needs implementation or deletion");
        return this.name;
    }

    public setComponent(n: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        this.name = c;
    }

    public insert(n: number, c: string): void {
        // throw new Error("needs implementation or deletion");
        // this.name = c + this.delimiter + this.name; (hat nicht funktioniert)
        // Fehlermeldung:
        // Expected: "oss#cs#fau#de" Received: "cs#oss#fau#de"
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
    }

    public append(c: string): void {
        // throw new Error("needs implementation or deletion");
        this.name += this.delimiter + c;
    }

    public remove(n: number): void {
        // throw new Error("needs implementation or deletion");
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
    }

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        this.name += this.delimiter + other.asString();
    }

}