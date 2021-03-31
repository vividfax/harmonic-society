let resources = {
	stone: 0,
	wood: 0,
    tools: 0,
    buildings: 0,
    ingredients: 0,
};

function manageResources(i) {

    switch(qwerty[i]) {
        case "B":
            resources.buildings += 1;
            resources.stone -= 1;
            resources.tools -= 1;
            resources.wood -= 1;
            break;
        case "K":
            resources.tools += 1;
            resources.stone -= 1;
            break;
        case "M":
            resources.stone += 1;
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
        case "K":
            if (resources.stone >= 1 && status == "disabled") {
                return "inactive";
            } else if (resources.stone < 1 && status == "active") {
                console.log("hiiii");
                return "disabled";
            }
            break;
    }
    return status;
}
