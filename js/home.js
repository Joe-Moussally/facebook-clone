let user_id = localStorage.getItem('user_id')




//----------Adding visit user profile on click-----------
let profiles = document.getElementsByClassName('profile');

for (let i=0; i<profiles.length; i++) {
    console.log(profiles[i].id)
    profiles[i].addEventListener('click', () => {

        let data = new FormData()
        data.append('id',profiles[i].id)

        axios({
            method: 'POST',
            url: 'http://facebook/profile.php',
            data: data
        }).then((Response) => {
            console.log(Response)
        })
    })
}

console.log(profiles)