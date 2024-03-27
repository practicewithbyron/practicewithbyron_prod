import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const formatText = (inputString, language) => {
    const elements = [];

    // Split the input string into lines
    const lines = inputString.split('\\n');

    var isCode = false;
    var isCodeEnd = false;
    // Iterate through each line
    for (const line of lines) {
        var formattedLine = "";
        for (const char of line) {
            if (char == "`") {
                if (isCode == true) { //If currently in a code snippet
                    isCodeEnd = true;
                }
                isCode ^= true;
            }
            else if (char == "£") {
                formattedLine += "\t";
            }
            else {
                formattedLine += char;
            }
            // Remove the initial '*' and replace it with a tab space
        }
        if (isCode || isCodeEnd) {
            elements.push(<SyntaxHighlighter language={language} style={docco} wrapLongLines={true}>
                {formattedLine}
            </SyntaxHighlighter>)
        }
        else {
            // Add the formatted line to the array
            elements.push(<p style={{ "margin": "10px 0" }}>{formattedLine}</p>);
        }
        isCodeEnd = false;
    }

    return elements;
}