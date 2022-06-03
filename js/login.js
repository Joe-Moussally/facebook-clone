let signupButton = document.getElementById('new-account');
let statusDiv = document.getElementById('status');

//redirect to signup
signupButton.addEventListener('click', () => {
    window.location.replace("http://facebook/html/signup.html");
})

document.getElementById("login-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let data = new FormData();

    data.append('email', email);
    data.append('password', password);

    let url = 'http://facebook/login.php';

    axios({
        method: 'POST',
        url: url,
        data: data
    })
        .then(function (response) {

            let result = response.data;
            if (result.response == 'not found') {
                document.getElementById("email").value = ''
                document.getElementById("password").value = ''
                statusDiv.innerHTML = 'email or password is incorrect'
            } else if (result.response == 'success') {
                let id = result.user_id;
                window.localStorage.setItem('user_id', id);
                window.location.replace("http://facebook/html/home.html");
            }

        });
});