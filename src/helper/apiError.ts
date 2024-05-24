
export class apiError  extends Error{
    constructor(
        public statuscode:number,
        public message:string = "something went wrong",
        public errors: string[] = [],
        public stack:string = "",
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace( this, this.constructor)
        }
    }
    public readonly data:null;
    public readonly success: boolean;
}

