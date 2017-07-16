function renderLine(line, entry)
{
    //Create the line element
    var lineelement = document.createElement("div");
    document.getElementById("quotes").appendChild(lineelement);
    lineelement.id = "Q" + entry;
    lineelement.className = "quote-line";
    
    var array = line.split("|");
    var author = array[0];
    var timestamp = array[1];
    var text = array[2];

    var time = new Date(new Number(timestamp));
    var timeelement = document.createElement("span");
    lineelement.appendChild(timeelement);
    timeelement.className = "quote-time";
    timeelement.textContent = time.toLocaleDateString() + " " + time.toLocaleTimeString()

    if(author === "")
    {
        var authorelement = document.createElement("span");
        lineelement.appendChild(authorelement);
        authorelement.className = "quote-author quote-anonymous";
    }
    else
    {
        var authorelement = document.createElement("a");
        lineelement.appendChild(authorelement);
        authorelement.className = "quote-author";
        authorelement.textContent = author;
        authorelement.setAttribute("href", "https://t.me/Steffo");
    }

    var textelement = document.createElement("span");
    lineelement.appendChild(textelement);
    textelement.className = "quote-text";
    textelement.textContent = text;
}

function renderDiario(text) {
    var lines = text.split("\n");
    lines.forEach(renderLine);
}

window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState !== 4)
        {
            return;
        }
        if(request.status !== 200)
        {
            //TODO: Error
            return;
        }
        renderDiario(request.responseText);
    }
    request.open("GET", "https://royal.steffo.eu/diario/diario.txt")
    request.send(null)
}