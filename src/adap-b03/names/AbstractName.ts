import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // throw new Error("needs implementation or deletion");
        this.delimiter = delimiter;
    }

    public clone(): Name {
        // Muss die Unterklasse selbst machen
        // --> jeder speichert seine Daten anders (String vs. Array)
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        // Hängt von der internen Struktur ab:
        // StringName hat 'nen String, StringArrayName hat ein Array
        // Deshalb hier keine gemeinsame Umsetzung möglich
        throw new Error("needs implementation or deletion");
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string { 
        // sieht bei den Unterklassen unterschiedlich aus,
        // also lieber dort umsetzen
        throw new Error("needs implementation or deletion");
    }

    public isEqual(other: Name): boolean {
        // throw new Error("needs implementation or deletion");
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        // throw new Error("needs implementation or deletion");
        let hash = 0;
        const dataString = this.asDataString();
        for (let i = 0; i < dataString.length; i++) {
            const char = dataString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; 
        }
        return hash;
    }

    public isEmpty(): boolean {
        // Ob leer oder nicht hängt davon ab,
        // ob es ein leerer String oder ein leeres Array ist
        throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        // throw new Error("needs implementation or deletion");
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        // throw new Error("needs implementation or deletion");
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}