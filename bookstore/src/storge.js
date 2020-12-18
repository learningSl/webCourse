
let data=[]

function save(car){
    data.push(car) 
}

function show(car){
    for(let i=0;i<data.length;i++){
        car.push(data[i])
    }
    return car
}
module.exports = {
    save,show
}