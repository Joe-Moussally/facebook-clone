let user_id = localStorage.getItem('user_id')




//----------Adding visit user profile on click-----------
let profiles = document.getElementsByClassName('profile');
console.log(user_id)

for (let i=0; i<profiles.length; i++) {
    console.log(profiles[i].id)
    profiles[i].addEventListener('click', () => {
        localStorage.setItem('profile_id',profiles[i].id)
        console.log("PROF ID",localStorage.getItem('profile_id'))
        window.location.replace("http://facebook/html/profile.html");
    })
}