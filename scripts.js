/* Place your JavaScript in this file */

function myFunction() {
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
            +"] "+formatStackTrace(obj.message)
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

function formatStackTrace(message){
    return message.replace(/\|/g, '\n');
}

function readFromFile(){
    const fileInput = document.getElementById('myfile');
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);
    var reader = new FileReader();
    reader.onload = function (e) {
        var textArea = document.getElementById("jsonLogs");
        textArea.value = e.target.result;
    };
    reader.readAsText(selectedFile);
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