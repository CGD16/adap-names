import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { ServiceFailureException } from "../common/ServiceFailureException";

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
            this.state === FileState.OPEN, 
            "file is not open"
        );
        
        IllegalArgumentException.assert(
            noBytes > 0, 
            "noBytes must be positive"
        );

        let result: Int8Array = new Int8Array(noBytes);
        // do something
        

        let tries: number = 0;
        const maxTries: number = 3;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch(ex) {
                tries++;
                if (tries >= maxTries) { // Error Handling nach Folie 39
                    if (ex instanceof Error) {
                        throw new ServiceFailureException(
                            "Failed to read byte after " + maxTries + " tries: " + ex.message);
                    } else {
                        throw new ServiceFailureException(
                        "Failed to read file after " + maxTries + " attempts");
                    }
                    
                }
                
                if (ex instanceof MethodFailedException) {
                    // Oh no! What @todo?!
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        return 0; // @todo
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