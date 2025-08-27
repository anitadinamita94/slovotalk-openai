let translateButton = document.querySelector("#translateButton");

console.log("Script cargado correctamente");

translateButton.addEventListener("click", async() => {

    let inputText = document.querySelector("#inputText");

    //sacar el valor a traducir
    const text = inputText.value.trim();

    //lenguaje de destino
    const targetLang = document.querySelector("#targetLang").value;

    if(!text) return false;

    //meter el mensaje de usuario a la caja de mensajes

    const userMessage = document.createElement("div");
    userMessage.className = "chat__message chat__message--user";
    userMessage.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    //peticion ajax al backend

    try{
        const response = await fetch("/api/traducir", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ text, targetLang })
        });

        const data = await response.json();

       
        //Agregare el mensaje de la IA al chat

        const botMessage = document.createElement("div");
        botMessage.className ="chat__message chat__message--bot";
        botMessage.textContent = data.translatedText;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    }catch (error){
        console.log("Error:", error);
    }

    //agregare el mensaje de la IA al chat

    //vaciar el input de tipo texto

   inputText.value = "";
});