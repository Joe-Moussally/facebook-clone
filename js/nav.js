let profile_nav = document.getElementById('profile-nav');
let logged_in_id = localStorage.getItem('user_id');
let datanav = new FormData();

datanav.append('id',logged_in_id);

axios({
    method: 'POST',
    url: 'http://facebook/profile.php',
    data:datanav
}).then((Response) => {
    profile_nav.src = Response.data[0].profile_picture;
    console.log(Response.data[0].id)
})

//adding redirect to profile
profile_nav.addEventListener('click', () => {
    localStorage.setItem('profile_id', logged_in_id);
    window.location.href = "http://facebook/html/profile.html"
})

//adding logout
document.getElementById('logout').addEventListener('click', () => {

    axios({
        method: 'POST',
        url: 'http://facebook/logout.php'
    })

})