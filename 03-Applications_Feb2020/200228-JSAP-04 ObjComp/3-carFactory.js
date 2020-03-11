function factory({model, power, color, carriage, wheelsize}) {
    const engineData = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ];

    let engine = engineData.find(e => power <= e.power);
    let carriageObj = {type: carriage, color};
    let wheels = Array(4).fill(wheelsize % 2 === 0 ? wheelsize - 1 : wheelsize);

    return {model, engine, carriage: carriageObj, wheels};
}