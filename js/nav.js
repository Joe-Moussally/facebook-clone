let profile_nav = document.getElementById('profile-nav');
let logged_in_id = localStorage.getItem('user_id');
let datanav = new FormData();
let profile_id = localStorage.getItem('profile_id')

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

    // localStorage.setItem('user_id',null);
    window.location.replace('http://facebook/html/login.html')
})

//visiting other profiles
if (logged_in_id != profile_id) {
    document.getElementsByClassName('active')[0].className = 'no-effect-nav';
}