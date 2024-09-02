async function requestToken() {
    const response = await fetch('/webAdminView/requestToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });
    const data = await response.json();

    if (data.status == true) {
        window.localAccsessToken = data.localAccsessToken;
        const display = ("An email has been sent to", data.email)
        alert(display) 
    } else {
        alert("Invalid Credentails")
    }
}

async function verfifyLogin() {
    const response = await fetch('/webAdminView/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: document.getElementById("token").value,
            localAccsessToken: window.localAccsessToken
        })
    });
    const data = await response.json();
    
    if (data.status == true) {
        window.serverAccsessToken = token;
        alert("You are now verified");
    } else {
        alert("Invalid Credentails");
    }
}
