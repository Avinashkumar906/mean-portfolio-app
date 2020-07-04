export class User{
    _id:any;
    email:string;
    name:string = 'JOHN DOE';
    image:string;
    bio:string = 'A Friend, Dude and Buddy From Earth';
    about:{
        name:string;
        designation:string;
        position:string;
        age:Date;
        city:string;
        country:string;
        description:string;
        services:Array<{
            image:string;
            title:string;
            description:string;
        }>
        skills:Array<{
            title:string;
            progress:number;
        }>
        pricing:Array<{
            title:string;
            price:number;
            services:Array<string>;
        }>
    }
    resume:{
        education:Array<{
            title:string;
            college:string;
            date:string;
            description:string;
        }>
        experience:Array<{
            title:string;
            college:string;
            date:string;
            description:string;
        }>
        testimonial:Array<{
            clientName:string;
            position:string;
            company:string;
            saying:string;
        }>
    }
    portfolio:{
        project:Array<{
            name:string;
            public_id:string;
            image:string;
            title:string;
            description:string;
            link:string;
            youtube:string;
            git:string;
            group:Array<string>
        }>
    }
    contact:{
        address:{
            line1:string;
            line2:string;
        }
        contact:{
            mob:number;
            email:string;
        }
        web:{
            url:string;
            url2:string;
        }
        social:{
            facebook:string;
            insta:string;
            twitter:string;
            linkedink:string;
        }
    }
    constructor(data:User){
        this.image = data.image;
        this.name = data.name;
        this.bio = data.bio;
        this.about = data.about;
        this.resume = data.resume;
        this.portfolio = data.portfolio;
        this.contact = data.contact;
    }
}
