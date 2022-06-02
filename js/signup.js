let loginButton = document.getElementById('login-button')

//redirect to login
loginButton.addEventListener('click', () => {
    window.location.replace("http://facebook/html/login.html");
})

document.getElementById("signup-button").addEventListener("click", function (event) {
    if (document.getElementById("password").value == document.getElementById("password2").value) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let data = new FormData();
            data.append('username',username) ,
            data.append('email', email);
            data.append('password', password);

        let url = 'http://facebook/signup.php';
        axios({
            method: 'POST',
            url: url,
            data: data
        })
            .then(function (response) {
                if (response.data === 'success') {
                    console.log(response)
                    window.location.replace("http://facebook/html/login.html");
                }
            });
    }
    else {
        document.getElementById('status').innerHTML = "Password does not match";
    }
});