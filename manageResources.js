let resources = {
	stone: 0,
	wood: 0,
    tools: 0,
    buildings: 0,
    ingredients: 0,
    herbs: 0,
    food: 0,
    people: 0,
    gold: 0,
    machines: 0,
};

function manageResources(i) {

    switch(qwerty[i]) {
        case "A":
            resources.gold += 2;
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
            resources.people += 2;
            resources.herbs -= 1;
            resources.buildings -= 1;
            break;
        case "E":
            resources.people += 2;
            resources.food -= 2;
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
            resources.machines += 3;
            resources.tools -= 1;
            resources.people -= 1;
            resources.buildings -= 1;
            break;
        case "K":
            resources.tools += 1;
            resources.stone -= 1;
            break;
        case "L":
            resources.food += 2;
            resources.buildings -= 1;
            resources.people -= 1;
            break;
        case "M":
            resources.stone += 2;
            break;
        case "N":
            resources.tools += 4;
            resources.machines -= 1;
            resources.people -= 1;
            resources.buildings -= 1;
            break;
        case "P":
            resources.herbs += 1;
            resources.food += 1;
            resources.tools -= 1;
            resources.buildings -= 1;
            break;
        case "R":
            resources.tools += 1;
            resources.buildings += 1;
            resources.people -= 1;
            break;
        case "T":
            resources.wood += 1;
            break;
        case "U":
            resources.gold += 3;
            resources.machinery -= 1;
            resources.buildings -= 1;
            resources.people -= 1;
            break;
        case "W":
            resources.gold += 3;
            resources.herbs -= 1;
            resources.buildings -= 1;
            resources.people -= 1;
            break;
        case "X":
            resources.gold -= 2;
            break;
        case "Y":
            resources.wood += 2;
            resources.stone += 2;
            resources.people -= 1;
            resources.buildings -= 1;
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
            if (resources.herbs >= 1 && resources.buildings >= 1 && resources.wood >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.herbs < 1 || resources.buildings < 1 || resources.wood < 1 && status != "disabled") {
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
            if (resources.tools >= 1 && resources.people >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 || resources.people < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "K":
            if (resources.stone >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.stone < 1 && status != "disabled") {
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
            if (resources.machines >= 1 && resources.people >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.machines < 1 || resources.people < 1 || resources.buildings < 1 && status != "disabled") {
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
        case "R":
            if (resources.people >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.people < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "T":
            break;
        case "U":
            if (resources.machines >= 1 && resources.people >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.machines < 1 || resources.people < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "U":
            if (resources.herbs >= 1 && resources.people >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.herbs < 1 || resources.people < 1 || resources.buildings < 1 && status != "disabled") {
                return "disabled";
            }
            break;
        case "X":
            if (resources.gold >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.gold < 1 && status != "disabled") {
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
    }
    return status;
}
