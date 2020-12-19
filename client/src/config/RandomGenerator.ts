import { IClick } from '../interfaces'
const domains  = [
    'google.com', 
    'habr.com/ru', 
    'digitalocean.com',
    'nytimes.com',
    'theguardian.com/international'
]

export const getRandomData =  (amount:  number, minDate:Date):IClick[] => {
    const res:IClick[] = [];
    for (let index = 0; index < amount; index++) {
        res.push(getRandomClick(minDate))
        
    }
    return res;
}

const getRandomClick = (minDate:Date):IClick => {
        const click = {
            domain: domains[getRandomInt(0, domains.length-1)],
            date: getrandomDate(minDate)
        }
    return click
}
const getrandomDate =(start: Date, end?: Date) => {
    end = end || new Date()
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}