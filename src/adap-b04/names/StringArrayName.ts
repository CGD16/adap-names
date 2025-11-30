import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        throw new Error("needs implementation or deletion");
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i)); 
        }
    }
}