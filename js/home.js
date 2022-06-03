let user_id = localStorage.getItem('user_id')




//----------Adding visit user profile on click-----------
let profiles = document.getElementsByClassName('profile');

for (let i=0; i<profiles.length; i++) {
    profiles[i].addEventListener('click', () => {
        localStorage.setItem('profile_id',profiles[i].id)
        window.location.replace("http://facebook/html/profile.html");
    })
}