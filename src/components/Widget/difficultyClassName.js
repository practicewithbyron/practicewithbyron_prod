export const difficultyClassName = (difficulty) => {
    var widgetDifficultyClassName = "";
    if(difficulty === "Entry")
    {
        widgetDifficultyClassName = "widgetComponentDifficulty-entry";
    }
    else if(difficulty === "Associate")
    {
        widgetDifficultyClassName = "widgetComponentDifficulty-associate";
    }
    else if(difficulty === "Professional")
    {
        widgetDifficultyClassName = "widgetComponentDifficulty-professional";
    }

    return widgetDifficultyClassName;
}