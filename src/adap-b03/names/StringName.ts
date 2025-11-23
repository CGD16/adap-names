import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        // this.noComponents = 1;
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
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.name.split(this.delimiter).length;
    }

    public getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string) {
        const nameSplitComponents = this.name.split(this.delimiter);
        nameSplitComponents[i] = c;
        this.name = nameSplitComponents.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        const nameSplitComponents = this.name.split(this.delimiter);
        nameSplitComponents.splice(i, 0, c);
        this.name = nameSplitComponents.join(this.delimiter);
    }

    public append(c: string) {
        if (this.isEmpty()) {
            this.name = c;
        } else {
            this.name += this.delimiter + c;
        }
    }

    public remove(i: number) {
        const nameSplitComponents = this.name.split(this.delimiter);
        nameSplitComponents.splice(i, 1);
        this.name = nameSplitComponents.join(this.delimiter);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}