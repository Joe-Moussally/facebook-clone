let profileId = localStorage.getItem('profile_id') //getting id of profile clicked on
let url1 = 'http://facebook/profile.php';
let url2 = 'http://facebook/get_profile_posts.php'

//HTML Elements
let username = document.getElementById('profile-username')
let profilePicture = document.getElementById('profile-picture-header')
let friendsCount = document.getElementById('friends-count')

let data1 = new FormData();
data1.append('id',profileId)

//profile body HTML Elements
let postsUl = document.getElementById('posts-container-ul')



console.log(profileId)

document.onload = (
    axios({
        method: 'POST',
        url: url1,
        data: data1
    }).then((Response) => {
        //populate HTML here
        //------------------
        username.innerHTML = Response.data[0].username;
        profilePicture.src = Response.data[0].profile_picture;
        friendsCount.innerHTML = Response.data[0].friends + ' friends';
        }

))

axios({
    method: 'POST',
    url: url2,
    data: data1
}).then((Response) => {
    console.log(Response.data)

    //populating ul
    Response.data.forEach((post) => {
        postsUl.innerHTML += '<li id="'+post.id+'"'+
        '<div class="post-header">'+
        '<img src="../db/posts/2.jpg">'
    })

})