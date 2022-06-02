document.getElementById("sign-up-btn").addEventListener("click", function (event) {
    if (document.getElementById("password").value == document.getElementById("comfirmPassword").value) {
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

        let url = 'http://foodity/backend/backend/signup.php';
        axios({
            method: 'POST',
            url: url,
            params: data
        })
            .then(function (response) {
                if (response.data === 'ok') {
                    window.location.href = "http://foodity/backend/draft/login.html";
                }
            });
    }
    else {
        alert("Password does not match");
    }
});