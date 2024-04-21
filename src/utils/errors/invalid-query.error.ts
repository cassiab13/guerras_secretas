import { StatusCode } from "../../enums/status.code";
import { ApiError } from "./api.error";

export class InvalidQueryError extends ApiError {

    constructor(message: string, statusCode: StatusCode) {
        super(message, statusCode)
    }

}