let resources = {
	stone: 0,
	wood: 0,
    tools: 0,
    buildings: 0,
    ingredients: 0,
    herbs: 0,
    food: 0,
};

function manageResources(i) {

    switch(qwerty[i]) {
        case "B":
            resources.buildings += 1;
            resources.stone -= 1;
            resources.tools -= 1;
            resources.wood -= 1;
            break;
        case "C":
            resources.food += 1;
            resources.ingredients-= 1;
            resources.buildings -= 1;
            break;
        case "F":
            resources.ingredients += 1;
            resources.tools -= 1;
            break;
        case "G":
            resources.ingredients += 1;
            resources.herbs += 1;
            resources.tools -= 1;
            break;
        case "H":
            resources.ingredients += 1;
            resources.tools -= 1;
            break;
        case "K":
            resources.tools += 1;
            resources.stone -= 1;
            break;
        case "M":
            resources.stone += 1;
            break;
        case "P":
            resources.herbs += 1;
            resources.food += 1;
            resources.tools -= 1;
            resources.buildings -= 1;
            break;
        case "T":
            resources.wood += 1;
            break;
    }
}

function getButtonStatus(i) {

    let status = buttons[i].status;

    switch(qwerty[i]) {
        case "B":
            if (resources.stone >= 1 && resources.tools >= 1 && resources.wood >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.stone < 1 || resources.tools < 1 || resources.wood < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "C":
            if (resources.ingredients >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.ingredients < 1 || resources.buildings < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "F":
            if (resources.tools >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "G":
            if (resources.tools >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "H":
            if (resources.tools >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "K":
            if (resources.stone >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.stone < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "M":
            break;
        case "P":
            if (resources.tools >= 1 && resources.buildings >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.tools < 1 || resources.buildings < 1 && status == "active") {
                return "disabled";
            }
            break;
        case "T":
            break;
    }
    return status;
}
