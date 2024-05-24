
export class apiResponse {
    constructor(public statuscode:number, public data:any, public message:string = "success"){
        this.statuscode = statuscode
        this.data = data
        this.message = message
        this.success = statuscode < 400
    }
    public readonly success:boolean
}

