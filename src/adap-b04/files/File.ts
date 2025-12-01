import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        IllegalArgumentException.assert(baseName !== null, "baseName is null");
        IllegalArgumentException.assert(baseName !== undefined, "baseName is undefined");
        IllegalArgumentException.assert(baseName.length > 0, "baseName is empty");

        IllegalArgumentException.assert(parent !== null, "parent is null");
        IllegalArgumentException.assert(parent !== undefined, "parent is undefined");
        
        super(baseName, parent);
    }

    public open(): void {
        IllegalArgumentException.assert(
            this.state !== FileState.OPEN, 
            "file is already open"
        );
        
        IllegalArgumentException.assert(
            this.state !== FileState.DELETED, 
            "can't open deleted file"
        );
        
        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        IllegalArgumentException.assert(
            this.state !== FileState.CLOSED, 
            "cannot read from closed file"
        );
        
        IllegalArgumentException.assert(
            this.state !== FileState.DELETED, 
            "cannot read from deleted file"
        );
        
        IllegalArgumentException.assert(noBytes >= 0, "noBytes is negative");

        return new Int8Array();
    }

    public close(): void {
        // PRECONDITION: Don't close a closed file
        IllegalArgumentException.assert(
            this.state !== FileState.CLOSED, 
            "file is already closed"
        );
        
        // PRECONDITION: Don't close a deleted file
        IllegalArgumentException.assert(
            this.state !== FileState.DELETED, 
            "cannot close deleted file"
        );
        
        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}