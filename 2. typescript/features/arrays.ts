const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date(), new Date()];

const carsByMake = [
    ['f150'],
    ['corolla'],
    ['camaro']
];

// Help with inference when extracting values 

const car1 = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values

// carMakers.push(100);

// Help with map

carMakers.map((car: string): string =>{
    return car.toUpperCase();
});

// Flexible types

const importantDates : (Date | string)[] = [];
importantDates.push("2023-01-10");
importantDates.push(new Date());

