export class Alarm {
    public id: string;
    public name: string;
    public severity: string;
    
    constructor(id: string, name: string, severity: string){
        this.id = id;
        this.name = name;
        this.severity = severity
    }
}