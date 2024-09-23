let localAccsessToken = "";
let serverAccsessToken = "";

async function requestToken() {
    const response = await fetch('/webAdminView/login/requestToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
        })
    });
    const data = await response.json();
    console.log(data);

    if (data.status == true) {
        localAccsessToken = data.localAccsessToken;
        const display = (`An email has been sent to ${data.email}`)
        alert(display) 
    } else {
        alert("Invalid Credentails")
    }
}

async function verfifyLogin() {
    const serverAccsessTokenToSend = document.getElementById("token").value;
    const localAccsessTokenToSend = localAccsessToken;
    const response = await fetch('/webAdminView/login/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serverAccsessToken: serverAccsessTokenToSend,
            localAccsessToken: localAccsessTokenToSend
        })
    });
    const data = await response.json();
    console.log(data);
    
    if (data.status == true) {
        serverAccsessToken = serverAccsessTokenToSend;
        alert("You are now verified");
    } else {
        alert("Invalid Credentails");
    }
}

async function addDatabase() {
    console.log(serverAccsessToken)
    console.log(localAccsessToken)

    const name = prompt('Name');
    const response = await fetch('/webAdminView/edit/addDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'local-access-token': localAccsessToken,
          'server-access-token': serverAccsessToken
        },
        body: JSON.stringify({
            name: name
        })
    });
    const data = await response.json();
    console.log(data);
}

async function viewDatabases() {
    try {
        const response = await fetch('/webAdminView/edit/getAllDatabase', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'local-access-token': localAccsessToken,
                'server-access-token': serverAccsessToken
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 

        const data = await response.json();
        console.log(data);

        let toAdd = "";  
        for (i in data.databases) {
            toAdd += `<div class="database"> 
            <h2>${data.databases[i].databaseName}</h2>
            <strong>${data.databases[i].databaseId}</strong>
            <span class='file-name'>${data.databases[i].fileName}</span>
            </div>`
        }

        document.getElementById('database-list').innerHTML = toAdd;
    } catch (error) {
        console.error('Error:', error);
    }
}