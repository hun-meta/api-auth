import { DB_CONNECTION_FAILED, DB_QUERY_FAILED, DB_UNDEFINED } from "src/orm/consts";
import { ConnectionIsNotSetError, ConnectionNotFoundError, QueryFailedError, TypeORMError } from "typeorm";

export class DatabaseException extends Error {
    public readonly name: string;
    public readonly query: string;
    public readonly parameters: any[];
    public readonly driveError: any;
    public readonly stack?: string;
  
    constructor(
        error: TypeORMError
    ) {
        super(error.message);
        
        if(error instanceof QueryFailedError){
            this.name = DB_QUERY_FAILED;
            this.query = error.query;
            this.parameters = error.parameters;
            this.driveError = error.driverError;
        }else if(error instanceof ConnectionNotFoundError || error instanceof ConnectionIsNotSetError){
            this.name = DB_CONNECTION_FAILED;
        }else{
            this.name = DB_UNDEFINED;
        }
        this.stack = error.stack || null;
    }
}
  