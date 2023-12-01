/* Place your JavaScript in this file */

function convertJsonToPlainText() {
    document.getElementById("convert").style.color = "red";
  
    // Read lines from the input field 
    var jsonTextArea = document.getElementById("jsonLogs");
    var lines = jsonTextArea.value.split("\n");
    var results = "";
    for(var i = 0;i < lines.length;i++){
        if (lines[i].length>100){
            const obj = JSON.parse(lines[i]);
            results = results 
            + obj.timestamp
            + " " +obj.level.padEnd(5)
            + " ["+obj.logger.padEnd(40)
            +"] ["+obj.code
            +"] - "+formatStackTrace(obj.message)
            +"\n";
        }
    }
    // set the value in plain text
    if (results.length>0) {
        document.getElementById('plainLogs').value = results;
    } else{
        document.getElementById('plainLogs').value = "Error parsing json logs";
    }
}

function convertJsonToPlainTextV2(jsonLogs, fileName) {
    document.getElementById("convert").style.color = "red";
    var lines = jsonLogs.split("\n");
    var results = "";
    for(var i = 0;i < lines.length;i++){
        if (lines[i].length>100){
            const obj = JSON.parse(lines[i]);
            results = results
            + obj.timestamp
            + " " +obj.level.padEnd(5)
            + " ["+obj.logger.padEnd(40)
            +"] ["+obj.code
            +"] - "+formatStackTrace(obj.message)
            +"\n";
        }
    }
    // set the value in plain text
    if (results.length>0) {
        document.getElementById('plainLogs').value = document.getElementById('plainLogs').value
            +"\n Converted json to plain text:"+fileName;
        // This results should be in download queue.
        return results;
    } else{
        document.getElementById('plainLogs').value = document.getElementById('plainLogs').value
            +"\n Error parsing json logs"+fileName;
    }
}

function formatStackTrace(message){
    return message.replace(/\|/g, '\n');
}

function readFromFile(){
    const fileInput = document.getElementById('myfile');
    if (fileInput.files.length==0) {
        return;
    }
    if (fileInput.files.length==1) {
        const selectedFile = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var textArea = document.getElementById("jsonLogs");
            textArea.value = e.target.result;
        };
        reader.readAsText(selectedFile);
    } else {
        const logFiles = fileInput.files;
        for (const file of logFiles){
            var textArea = document.getElementById("jsonLogs");
            textArea.value = textArea.value + "\n Parsing multiple files"
            var reader = new FileReader();
            reader.onload = function (e) {
                const logsLines = e.target.result;
                textArea.value = textArea.value
                           + "\n File read:"+file.name;
                const plainText = convertJsonToPlainTextV2(logsLines, file.name);

                downloadFile(plainText, file.name);

                document.getElementById('plainLogs').value = document.getElementById('plainLogs').value
                                                           + "\n download initiated for plain text:"+file.name;
            };
            reader.readAsText(file);
        }
    }
}

function download() {
    var jsonTextArea = document.getElementById("plainLogs");
    var lines = jsonTextArea.value;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(lines));
    element.setAttribute('download', "parsed.ActiveTransfer.log");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadFile(parsedLogs, fileName) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(parsedLogs));
    element.setAttribute('download', "parsed."+fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function clearText() {
    document.getElementById('plainLogs').value = "";
    document.getElementById('jsonLogs').value = "";
}