import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        if (delimiter) {
            this.delimiter = delimiter;
        }
        this.name = source;
        this.noComponents = 1;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        return this.name;
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.name.length; i++) {
            const char = this.name.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        return this.name;
    }

    public setComponent(i: number, c: string) {
        this.name = c;
    }

    public insert(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
    }

    public append(c: string) {
        this.name += this.delimiter + c;
    }

    public remove(i: number) {
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
    }

    public concat(other: Name): void {
        this.name += this.delimiter + other.asString();
    }

}