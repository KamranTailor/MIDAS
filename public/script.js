let localAccsessToken = "";
let serverAccsessToken = "";
let databases = [];  // Store databases globally for search
let loginContainer = document.getElementById("login-container");
let content = document.getElementById("content");

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

    if (data.status) {
        localAccsessToken = data.localAccsessToken;
        alert(`An OTP has been sent to admin ${data.email}`);
    } else {
        alert("Invalid Credentials");
    }
}

async function verifyLogin() {
    const serverAccsessTokenToSend = document.getElementById("token").value;
    const response = await fetch('/webAdminView/login/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serverAccsessToken: serverAccsessTokenToSend,
            localAccsessToken: localAccsessToken
        })
    });
    const data = await response.json();
    console.log(data);
    
    if (data.status) {
        serverAccsessToken = serverAccsessTokenToSend;
        alert("You are now verified");
        content.style.display = "block";
        loginContainer.style.display = "none";
    } else {
        alert("Invalid Credentials");
    }
}

async function addDatabase() {
    const name = prompt('Name');
    const response = await fetch('/webAdminView/edit/addDatabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'local-access-token': localAccsessToken,
          'server-access-token': serverAccsessToken
        },
        body: JSON.stringify({ name })
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

        // Store databases globally for search functionality
        databases = data.databases;

        renderDatabaseList(databases);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderDatabaseList(databasesToRender) {
    document.getElementById("database-list-co").display= "block";
    const databaseList = document.getElementById("database-list");
    databaseList.innerHTML = databasesToRender.map(db => `
        <div class="database"> 
            <h2>${db.databaseName}</h2>
            <strong>${db.databaseId}</strong>
            <span class='file-name'>${db.fileName}</span>
        </div>
    `).join("");
}

function searchDatabases() {
    const searchTerm = document.getElementById("search-box").value.toLowerCase();
    const filteredDatabases = databases.filter(db =>
        db.databaseName.toLowerCase().includes(searchTerm) ||
        db.databaseId.toLowerCase().includes(searchTerm) ||
        db.fileName.toLowerCase().includes(searchTerm)
    );

    renderDatabaseList(filteredDatabases);
}