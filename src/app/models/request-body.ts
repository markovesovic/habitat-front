export class RequestBody{
    price_min : number | null ;
    price_max : number | null;
    size_min : number | null;
    size_max : number | null;
    sort : String | null;
    params: ParamBody;

    constructor(){
        this.price_min = null;
        this.price_max = null;
        this.size_min = null;
        this.size_max = null;
        this.sort = "rating";
        this.params = new ParamBody();
    }
}


class ParamBody{
    yard : boolean | null;
    for_rent: boolean | null;
    building_type : String | null;
    property_type : String | null;
    bedrooms : number | null;
    bathrooms : number | null;
    furnishment : Furnishment;
    floor_type : String | null;
    distribution : String | null;
    elevator : boolean | null;
    garage : boolean | null;
    parking : boolean | null;
    terrace : boolean | null;
    swimming_pool : String | null; // yes-no
    doorkeeper : String | null; // yes-no
    building_security : boolean | null;

    constructor(){
        this.yard = null;
        this.for_rent = null;
        this.building_type = null;
        this.property_type = null;
        this.bedrooms = null;
        this.bathrooms = null;
        this.furnishment = new Furnishment();
        this.floor_type = null;
        this.distribution = null;
        this.elevator = null;
        this.garage = null;
        this.parking = null;
        this.terrace = null;
        this.swimming_pool = null;
        this.doorkeeper = null;
        this.building_security = null;
    }
}

class Furnishment{
    en : String | null;

    constructor(){
        this.en = null;
    }
}