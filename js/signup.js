document.getElementById("signup-button").addEventListener("click", function (event) {
    if (document.getElementById("password").value == document.getElementById("password2").value) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        debugger

        let data = {
            username,
            email,
            password
        }

        let url = 'http://facebook/signup.php';
        axios({
            method: 'POST',
            url: url,
            params: data
        })
            .then(function (response) {
                if (response.data === 'ok') {
                    window.location.href = "http://facebook/html/login.html";
                }
            });
    }
    else {
        alert("Password does not match");
    }
});