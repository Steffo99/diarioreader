function renderLine(line, entry)
{
    //Create the line element
    var lineelement = document.createElement("div");
    document.getElementById("quotes").appendChild(lineelement);
    lineelement.id = "Q" + entry;
    lineelement.className = "quote-line";
    
    var author = line["author"];
    var timestamp = line["timestamp"];
    var text = line["text"];

    var numberelement = document.createElement("a");
    lineelement.appendChild(numberelement);
    numberelement.className = "quote-permalink";
    numberelement.textContent = entry;
    numberelement.setAttribute("href", "#Q" + entry);

    var time = new Date(new Number(timestamp) * 1000);
    var timeelement = document.createElement("span");
    lineelement.appendChild(timeelement);
    timeelement.className = "quote-time";
    timeelement.textContent = time.toLocaleDateString() + " " + time.toLocaleTimeString()

    if(author === "" || author == undefined)
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
    var lines = JSON.parse(text)
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
    request.open("GET", "https://royal.steffo.eu/diario/diario.json")
    request.send(null)
}