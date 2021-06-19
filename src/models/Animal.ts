export class Animal {
    id: number;
    name: string;
    latinName: string;
    yearOfBirth: number;
    shortDescription: string;
    longDescription: string;
    imageUrl: string;
    medicine: string;
    isFed: boolean;
    lastFed: Date;

    constructor (
        id: number,
        name: string,
        latinName: string,
        yearOfBirth: number,
        shortDescription: string,
        longDescription: string,
        imageUrl: string,
        medicine: string,
        isFed: boolean,
        lastFed: Date
      ){
        this.id = id;
        this.name = name;
        this.latinName = latinName;
        this.yearOfBirth = yearOfBirth;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.imageUrl = imageUrl;
        this.medicine = medicine;
        this.isFed = isFed;
        this.lastFed = lastFed;
      }
}