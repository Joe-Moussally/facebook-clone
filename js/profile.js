let profileId = localStorage.getItem('profile_id') //getting id of profile clicked on
let url1 = 'http://facebook/profile.php';

//HTML Elements
let username = document.getElementById('profile-username')
let profilePicture = document.getElementById('profile-picture-header')
let friendsCount = document.getElementById('friends-count')

let data1 = new FormData();
data1.append('id',profileId)

console.log(profileId)

document.onload = (
    axios({
        method: 'POST',
        url: url1,
        data: data1
    }).then((Response) => {
        //populate HTML here
        //------------------
        console.log(Response.data[0])
        username.innerHTML = Response.data[0].username;
        profilePicture.src = Response.data[0].profile_picture;
        friendsCount.innerHTML = Response.data[0].friends + ' friends';
        }
        //on succesful response get number of friends

    )
)