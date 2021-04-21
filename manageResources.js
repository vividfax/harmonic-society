let resources = {
	stone: 0,
	wood: 0,
    tools: 0,
    buildings: 0,
    ingredients: 0,
    herbs: 0,
    food: 0,
    people: 0,
    knowledge: 0,
    books: 0,
    energy: 0,
    machinery: 0,
    computers: 0,
    joy: 0,
    score: 0,
};

function manageResources(i) {

    switch(qwerty[i]) {
        case "A":
            resources.joy += 1;
            resources.food -= 1;
            resources.buildings -= 1;
            break;
        case "B":
            resources.buildings += 3;
            resources.stone -= 1;
            resources.tools -= 1;
            resources.wood -= 1;
            break;
        case "C":
            resources.food += 3;
            resources.ingredients -= 1;
            resources.buildings -= 1;
            resources.wood -= 1;
            break;
        case "D":
            resources.people += 4;
            resources.herbs -= 1;
            resources.buildings -= 1;
            resources.knowledge -= 1;
            break;
        case "E":
            resources.people += 3;
            resources.food -= 3;
            break;
        case "F":
            resources.ingredients += 1;
            resources.tools -= 1;
            break;
        case "G":
            resources.ingredients += 1;
            resources.herbs += 1;
            resources.tools -= 2;
            break;
        case "H":
            resources.ingredients += 1;
            resources.tools -= 1;
            break;
        case "I":
            resources.machinery += 3;
            resources.tools -= 1;
            resources.knowledge -= 1;
            resources.buildings -= 1;
            break;
        case "J":
            resources.energy += 4;
            resources.tools -= 1;
            resources.knowledge -= 1;
            resources.buildings -= 1;
            break;
        case "K":
            resources.tools += 2;
            resources.stone -= 1;
            resources.wood -= 1;
            break;
        case "L":
            resources.food += 3;
            resources.buildings -= 1;
            resources.people -= 1;
            break;
        case "M":
            resources.stone += 2;
            break;
        case "N":
            resources.tools += 3;
            resources.buildings += 3;
            resources.knowledge -= 1;
            resources.computers-= 1;
            resources.energy -= 1;
            break;
        case "O":
            resources.computers += 4;
            resources.machinery -= 1;
            resources.buildings -= 1;
            resources.knowledge -= 1;
            resources.energy -= 1;
            break;
        case "P":
            resources.herbs += 1;
            resources.food += 1;
            resources.tools -= 1;
            resources.buildings -= 1;
            break;
        case "Q":
            resources.computers += 2;
            resources.machinery += 2;
            resources.books -= 1;
            resources.knowledge -= 1;
            break;
        case "R":
            resources.tools += 1;
            resources.buildings += 1;
            resources.people -= 1;
            break;
        case "S":
            resources.joy += 4;
            resources.computers -= 1;
            resources.people -= 1;
            resources.energy -= 1;
            break;
        case "T":
            resources.wood += 2;
            break;
        case "U":
            resources.knowledge += 3;
            resources.people -= 3;
            break;
        case "V":
            resources.books += 2;
            resources.knowledge -= 1;
            break;
        case "W":
            resources.joy += 3;
            resources.herbs -= 1;
            resources.buildings -= 1;
            resources.people -= 1;
            break;
        case "X":
            resources.score += 1;
            resources.joy -= 2;
            break;
        case "Y":
            resources.wood += 2;
            resources.stone += 2;
            resources.people -= 1;
            resources.buildings -= 1;
            break;
        case "Z":
            resources.knowledge += 2;
            resources.joy += 2;
            resources.people -= 1;
            resources.books -= 1;
            break;
    }
}

function getButtonStatus(i) {

    let status = buttons[i].status;

    switch(qwerty[i]) {
        case "A":
            if (resources.food >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.food < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "B":
            if (resources.stone >= 1 && resources.tools >= 1 && resources.wood >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.stone < 1 || resources.tools < 1 || resources.wood < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "C":
            if (resources.ingredients >= 1 && resources.buildings >= 1 && resources.wood >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.ingredients < 1 || resources.buildings < 1 || resources.wood < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "D":
            if (resources.herbs >= 1 && resources.buildings >= 1 && resources.knowledge >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.herbs < 1 || resources.buildings < 1 || resources.knowledge < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "E":
            if (resources.food >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.food < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "F":
            if (resources.tools >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "G":
            if (resources.tools >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "H":
            if (resources.tools >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "I":
            if (resources.tools >= 1 && resources.knowledge >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 || resources.knowledge < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "J":
            if (resources.tools >= 1 && resources.knowledge >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 || resources.knowledge < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "K":
            if (resources.stone >= 1 && resources.wood >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.stone < 1 || resources.wood < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "L":
            if (resources.people >= 1 && resources.buildings >= 1 && resources.wood >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.people < 1 || resources.buildings < 1 || resources.wood < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "M":
            break;
        case "N":
            if (resources.computers >= 1 && resources.knowledge >= 1 && resources.energy >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.computers < 1 || resources.knowledge < 1 || resources.energy < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "O":
            if (resources.machinery >= 1 && resources.knowledge >= 1 && resources.buildings >= 1 && resources.energy >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.machinery < 1 || resources.knowledge < 1 || resources.buildings < 1 || resources.energy < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "P":
            if (resources.tools >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "Q":
            if (resources.books >= 1 && resources.knowledge >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.books < 1 || resources.knowledge < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "R":
            if (resources.people >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.people < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "S":
            if (resources.computers >= 1 && resources.people >= 1 && resources.energy >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.computers < 1 || resources.people < 1 || resources.energy < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "T":
            break;
        case "U":
            if (resources.people >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.people < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "V":
            if (resources.knowledge >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.knowledge < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "W":
            if (resources.herbs >= 1 && resources.people >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.herbs < 1 || resources.people < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "X":
            if (resources.joy >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.joy < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "Y":
            if (resources.people >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.people < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "Z":
            if (resources.people >= 1 && resources.books >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.people < 1 || resources.books < 1 && status != "disabled") {
                return "disabled";
            }
            break;
    }
    return status;
}
