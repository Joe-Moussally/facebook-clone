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
        postsUl.innerHTML += '<li id="'+post.post_id+'">'+
        '<div class="post-header">'+
        '<img src="'+post.profile_picture+'" class="post-header-img">'+
        '<h2>'+post.username+'</h2></div>'+
        '<img src="'+post.photo+'" class="post-photo">'+
        '<div class="post-body">'+
        '<div class="like-comment">'+
        '<span class="like"><i class="fa-regular fa-heart"></i></span>'+
        '<span class="comment"><i class="fa-regular fa-comment"></i></span>'+
        '<span class="post-likes">'+post.likes+' likes</span></div>'+
        '<div class="post-description">'+
        '<span class="post-description-username">'+post.username+'</span>'+
        '<span class="post-description">'+post.description+'</span></div>'+
        '<div class="add-comment"></div>'+
        '<div class="post-comments">'+
        '<span class="comment-label">Comments</span>'+
        '<ul class="post-comments-ul">'+
        '<li>'+
        '<span class="post-comment-username">sheldon</span>'+
        '<span class="post-comment">Livelong and prosper</span>'+
        '</li></ul></div>'+
        '<div class="post-footer">'+post.created_at+'</div>'+
        '</div><div class="hr"></div></li>'

    })

})