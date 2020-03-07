//01 Heroic Inventory
function heroicInventory(input) {
    let heroesData = [];

    for (let i = 0; i < input.length; i++) {
        let heroData = input[i].split(" / ");

        let hero = {
            name: heroData[0],
            level: +heroData[1],
            items: heroData.length > 2 ? heroData[2].split(", ") : [],
        };

        heroesData.push(hero);
    }

    console.log(JSON.stringify(heroesData));
}

heroicInventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']
);

//02 JSON talbe
function jsonTable(input) {
    let employees = [];

    input.forEach(x => {
        employees.push(JSON.parse(x));
    });

    let htmlTableArray = [];
    htmlTableArray.push("<table>");

    employees.forEach(e => {
        htmlTableArray.push("\t" + "<tr>");
        Object.values(e).forEach(data => {
            let pushData = escapeHtml(data.toString());
            htmlTableArray.push("\t" + "\t" + `<td>${pushData}</td>`);
        });
        htmlTableArray.push("\t" + "</tr>");
    });

    htmlTableArray.push("</table>");

    console.log(htmlTableArray.join("\n"));

    function escapeHtml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

jsonTable(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']
);

//03 Cappy Juice
//Solution is for using multiple methods, not for being optimal
function cappyJuice(input) {
    let juices = [];
    let counter = 1;

    for (const element of input) {
        let juiceData = element.split(" => ");
        let [juiceName, juiceQuantity] = [juiceData[0], +juiceData[1]];

        if (!juices.some(j => j.name === juiceData[0])) {
            let juice = {
                name: juiceName,
                quantity: 0
            }

            juices.push(juice);
        }

        let juice = juices.find(j => j.name === juiceName);
        juice.quantity += juiceQuantity;

        if (!juice.hasOwnProperty("order") && juice.quantity >= 1000) {
            juice.order = counter++;
        }
    }

    juices.filter(j => j.order).sort((a, b) => a.order - b.order).map(x => console.log(`${x.name} => ${Math.trunc(x.quantity / 1000)}`));
}

cappyJuice(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']
);

//04 Storage Catalogue
function storageCatalogue(input) {
    let result = input.reduce((acc, curr) => {
        let [productName, productPrice] = curr.split(" : ");

        let category = productName[0].toUpperCase();

        if (!acc[category]) {
            acc[category] = [];
        }

        acc[category].push(`  ${productName}: ${productPrice}`);
        return acc;
    }, {});

    // let obj = Object.keys(result).sort().map(x => {
    //     console.log(x);
    //     result[x].sort().map(y => console.log(y));
    // });

    Object.entries(result).sort((a, b) => a[0].localeCompare(b[0]))
        .map(kvp => {
            console.log(kvp[0]);
            kvp[1].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            console.log(kvp[1].join("\n"))
        });
}

storageCatalogue(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
);

//05 Auto engineering company
function autoEngineeringCompany(input) {
    let result = input.reduce((acc, curr) => {
        let carData = curr.split(" | ");
        let [carBrand, carModel, producedCars] = [carData[0], carData[1], +carData[2]];

        if (!acc[carBrand]) {
            acc[carBrand] = {};
        }

        if (!acc[carBrand][carModel]) {
            acc[carBrand][carModel] = producedCars;
        } else {
            acc[carBrand][carModel] += producedCars;
        }

        return acc;
    }, {});

    Object.entries(result).map(c => {
        console.log(c[0]);
        Object.entries(c[1]).map(brand => {
            console.log(`###${brand[0]} -> ${brand[1]}`);
        });
    });
}

autoEngineeringCompany(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);

//06 System components
function systemComponents(input) {
    let result = input.reduce((acc, curr) => {
        let systemData = curr.split(" | ");
        let [name, component, subcomponent] = [...systemData];

        if (!acc[name]) {
            acc[name] = {};
        }

        if (!acc[name][component]) {
            acc[name][component] = [];
        }

        acc[name][component].push(subcomponent);

        return acc;
    }, {});

    Object.entries(result)
        .sort((a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length ||
            a[0].toLowerCase().localeCompare(b[0].toLowerCase()))
        .map(system => {
            console.log(system[0]);
            Object.entries(system[1]).sort((a, b) => b[1].length - a[1].length)
                .map(comp => {
                    console.log(`|||${comp[0]}`);
                    comp[1].forEach(subc => console.log(`||||||${subc}`));
                });
        });
}

systemComponents(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security']
);

//07 Usernames
function usernames(input) {
    let usernames = new Set(input);
    let sortedUsernames = Array.from(usernames).sort((a, b) => a.length - b.length || a.localeCompare(b));
    console.log(sortedUsernames.join("\n"));
}

usernames(['Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston']
);

//08 Unique Sequences
function uniqueSequences(input) {
    let myMap = input.reduce((acc, curr) => {
        let arr = JSON.parse(curr).map(x => +x).sort((a, b) => b - a);
        let stringArr = arr.join(", ");
        if (!acc.has(stringArr)) {
            acc.set(stringArr, arr.length);
        }
        return acc;
    }, new Map());

    Array.from(myMap.keys())
        .sort((a, b) => myMap.get(a) - myMap.get(b))
        .map(x => console.log(`[${x}]`));
}

uniqueSequences(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]
);

//09 Arena Tier
function arenaTier(input) {
    let inputLine = "";
    let tier = {};

    while ((inputLine = input.shift()) !== "Ave Cesar") {
        if (inputLine.includes("->")) {
            addGladiatorData(inputLine, tier);
        } else if (inputLine.includes("vs")) {
            fightGladiators(inputLine, tier);
        }
    }

    print(tier);

    function addGladiatorData(inputLine, tier) {
        let [name, technique, skill] = inputLine.split(" -> ");
        skill = Number(skill);

        if (!tier[name]) {
            tier[name] = { [technique]: skill };
            return;
        }

        if (!tier[name][technique] || tier[name][technique] < skill) {
            tier[name][technique] = skill;
        }
    }

    function fightGladiators(inputLine, tier) {
        let [gladiatorOne, gladiatorTwo] = inputLine.split(" vs ");

        if (tier[gladiatorOne] && tier[gladiatorTwo]) {
            if (Object.keys(tier[gladiatorOne]).some(t => Object.keys(tier[gladiatorTwo]).includes(t))) {
                let gladiatorOneSkillPoints = Object.values(tier[gladiatorOne]).reduce((a, b) => a + b);
                let gladiatorTwoSkillPoints = Object.values(tier[gladiatorTwo]).reduce((a, b) => a + b);

                if (gladiatorOneSkillPoints < gladiatorTwoSkillPoints) {
                    delete tier[gladiatorOne];
                } else if (gladiatorOneSkillPoints > gladiatorTwoSkillPoints) {
                    delete tier[gladiatorTwo];
                }
            }
        };
    }

    function print(tier) {
        Object.entries(tier)
            .sort((a, b) => Object.values(b[1]).reduce((x, y) => x + y) - Object.values(a[1]).reduce((x, y) => x + y)
                || a[0].localeCompare(b[0])).map(g => {
                    console.log(`${g[0]}: ${Object.values(g[1]).reduce((x, y) => x + y)} skill`);
                    Object.entries(g[1]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
                        .map(t => console.log(`- ${t[0]} <!> ${t[1]}`));
                });
        ;
    }
}

arenaTier(["Pesho -> BattleCry -> 400",
    "Gosho -> PowerPunch -> 300",
    "Stamat -> Duck -> 200",
    "Stamat -> Tiger -> 250",
    "Ave Cesar"
]);

// arenaTier(["Pesho -> Duck -> 400",
//     "Julius -> Shield -> 150",
//     "Gladius -> Heal -> 200",
//     "Gladius -> Support -> 250",
//     "Gladius -> Shield -> 250",
//     "Pesho vs Gladius",
//     "Gladius vs Julius",
//     "Gladius vs Gosho",
//     "Ave Cesar"
// ]);

//10 Game of Epicness
function gameOfEpicness(data, fights) {
    let kingdoms = parseKingdomData(data);

    for (const fight of fights) {
        fighting(kingdoms, fight);
    }

    let winnerKingdom = getWinnerKingdom(kingdoms);

    print(winnerKingdom);
    ;
    function parseKingdomData(data) {
        return data.reduce((acc, curr) => {
            if (!acc[curr.kingdom]) {
                acc[curr.kingdom] = { [curr.general]: { army: curr.army, wins: 0, loses: 0 }, totalWins: 0, totalLoses: 0 };
                return acc;
            }

            if (!acc[curr.kingdom][curr.general]) {
                acc[curr.kingdom][curr.general] = { army: curr.army, wins: 0, loses: 0 };
                return acc;
            }

            acc[curr.kingdom][curr.general].army += curr.army;
            return acc;
        }, {});
    }

    function fighting(kingdoms, fight) {
        let [atkKingdom, atkGeneralName, defKingdom, defGeneralName] = [...fight];

        if (atkKingdom === defKingdom) {
            return;
        }

        let atkGeneral = kingdoms[atkKingdom][atkGeneralName];
        let defGeneral = kingdoms[defKingdom][defGeneralName];

        if (atkGeneral.army === defGeneral.army) {
            return;
        } else if (atkGeneral.army > defGeneral.army) {
            adjustBattleResults(kingdoms[atkKingdom], atkGeneral, kingdoms[defKingdom], defGeneral);
        } else {
            adjustBattleResults(kingdoms[defKingdom], defGeneral, kingdoms[atkKingdom], atkGeneral);
        }
    }

    function adjustBattleResults(winningKingdom, winningGeneral, losingKingdom, losingGeneral) {
        winningGeneral.wins++;
        winningKingdom.totalWins++;
        winningGeneral.army = Math.floor(winningGeneral.army * 1.1);

        losingGeneral.loses++;
        losingKingdom.totalLoses++;
        if (losingGeneral.army > 0) {
            losingGeneral.army = Math.floor(losingGeneral.army * 0.9);
        }
    }

    function getWinnerKingdom(kingdoms){
        return Object.entries(kingdoms)
        .sort((a,b) => b[1].totalWins - a[1].totalWins ||
         a[1].totalLoses - b[1].totalLoses ||
         a[0].localeCompare(b[0]))[0];
    }

    function print(winnerKingdom){
       console.log(`Winner: ${winnerKingdom[0]}`);

       let generals = Object.entries(winnerKingdom[1]).filter(v => v[1] instanceof Object);

       generals.sort((a, b) => b[1].army - a[1].army).map(g => {
            console.log(`/\\general: ${g[0]}`);
            console.log(`---army: ${g[1].army}`);
            console.log(`---wins: ${g[1].wins}`);
            console.log(`---losses: ${g[1].loses}`);
       });
    }
}

gameOfEpicness([{ kingdom: 'Maiden Way', general: 'Merek', army: 5000 },
{ kingdom: 'Stonegate', general: 'Ulric', army: 4900 },
{ kingdom: 'Stonegate', general: 'Doran', army: 70000 },
{ kingdom: 'YorkenShire', general: 'Quinn', army: 10 },
{ kingdom: 'YorkenShire', general: 'Quinn', army: 2000 },
{ kingdom: 'Maiden Way', general: 'Berinon', army: 100000 }],
    [["YorkenShire", "Quinn", "Stonegate", "Ulric"],
    ["Stonegate", "Ulric", "Stonegate", "Doran"],
    ["Stonegate", "Doran", "Maiden Way", "Merek"],
    ["Stonegate", "Ulric", "Maiden Way", "Merek"],
    ["Maiden Way", "Berinon", "Stonegate", "Ulric"]]
);