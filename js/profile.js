let profileId = localStorage.getItem('profile_id') //getting id of profile clicked on
let user_id = localStorage.getItem('user_id');
let url1 = 'http://facebook/profile.php';
let url2 = 'http://facebook/get_profile_posts.php'
let url3 = 'http://facebook/get_post_comments.php'
var postsArray;

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

        console.log("HEADERRR",Response.data[0])
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

        let postId = post.post_id;

        

        postsUl.innerHTML += '<li id="'+post.post_id+'">'+
        '<div class="post-header">'+
        '<img src="'+post.profile_picture+'" class="post-header-img">'+
        '<h2>'+post.username+'</h2><button class="delete-post-button">Delete post</button></div>'+
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
        '<ul class="post-comments-ul" id="'+post.post_id+'-comments">'+
        '</ul></div><div class="post-footer">'+post.created_at+'</div>'+
        '</div><div class="hr"></div></li>';

    })



    //managin and hiding buttons in profile
    if (user_id != profileId) {
        
        document.getElementById('hr1').style.display = 'none';
        document.getElementById('add-post').style.display = 'none';
        document.getElementById('add-status').style.display = 'none';
        document.getElementById('change-picture').style.display = 'none';
        document.getElementById('add-status').style.display = 'none';

       let del_buttons = document.getElementsByClassName('delete-post-button');

       Array.from(del_buttons).forEach((button) => {
        button.style.display = 'none';
      });
    } else if (user_id == profileId) {
        document.getElementById('send-request').style.display = 'none';
        document.getElementById('block').style.display = 'none';
    }

    //adding delete button functionality
    let deleteButton = $('.delete-post-button');
    $(deleteButton).on('click', (e) => {
        console.log($(e.currentTarget).parent().parent()[0].id)
        let li = $(e.currentTarget).parent().parent()[0]
        let post_id = $(e.currentTarget).parent().parent()[0].id
        $(li).fadeOut(200);

        let data = new FormData()
        data.append('post_id',post_id);

        axios({
            method: 'POST',
            url: 'http://facebook/delete_post.php',
            data: data

        }).then((Response) => {
            console.log("DELETED")
            
        })

    })
    get_post_comments()
    checkFriends()
})


const get_post_comments = () => {

    let li_posts = document.getElementsByTagName('li');

    for (let i=0; i<li_posts.length; i++) {
        let ul_comment = document.getElementById(li_posts[i].id+'-comments')
        let comment_data = new FormData();
        comment_data.append('id',li_posts[i].id);

        axios({
            method: 'POST',
            url: 'http://facebook/get_post_comments.php',
            data: comment_data
        }).then((Response) => {
            Response.data.forEach((comment) =>{
                ul_comment.innerHTML += '<li>'+
                '<span class="post-comment-username">'+comment.username+'</span>'+
                '<span class="post-comment">'+comment.text+'</span>'+
                '</li>'
            })
        })
    }
    
}

//upload post-----------------------
document.getElementById('add-post').addEventListener('click',()=>{
    window.location.replace('http://facebook/html/add_post.html')
})

//Adding event listener to friends list
let friends = document.getElementById('friends-count')

console.log(friends)

friends.addEventListener('click', () => {
    window.location.replace('http://facebook/html/friends_list.html')
})

//redirect to change picture
document.getElementById('change-picture').addEventListener('click', () => {
    window.location.replace('http://facebook/html/change_picture.html');
})

const checkFriends = () => {
    //checking if users are friends
    let friends_data = new FormData();
    friends_data.append('user_id', localStorage.getItem('user_id'));
    friends_data.append('profile_id', localStorage.getItem('profile_id'));
    axios({
        method: 'POST',
        url: 'http://facebook/check_friends.php',
        data: friends_data
    }).then((Response) => {
        console.log(Response.data.friends)
        let are_friends = Response.data.friends;
        if (are_friends == 'true') {

            document.getElementById('send-request').innerHTML = 'Remove friends'
            document.getElementById('send-request').id = 'remove-friend';
            

            document.getElementById('remove-friend').addEventListener('click', () => {

                let data = new FormData();
                data.append('user_id',localStorage.getItem('user_id'));
                data.append('profile_id',localStorage.getItem('profile_id'));

                axios({
                    method: 'POST',
                    url: 'http://facebook/remove_friend.php',
                    data: data
                }).then((Response) => {
                    document.getElementById('remove-friend').id = 'send-request';
                })
            })
        }
    })

    //on pending friend request
    let pending_data = new FormData();
    pending_data.append('user_id', localStorage.getItem('user_id'));
    pending_data.append('profile_id', localStorage.getItem('profile_id'));
    axios({
        method: 'POST',
        url: 'http://facebook/check_pending.php',
        data: friends_data
    }).then((Response) => {
        console.log('friend request pending: ',Response.data.pending)
        let is_pending = Response.data.pending;
        if (is_pending == 'true') {

            document.getElementById('send-request').id = 'pending';
            document.getElementById('remove-friend').innerHTML = 'Request sent'

            document.getElementById('remove-friend').addEventListener('click', () => {

                let data = new FormData();
                data.append('user_id',localStorage.getItem('user_id'));
                data.append('profile_id',localStorage.getItem('profile_id'));

                axios({
                    method: 'POST',
                    url: 'http://facebook/remove_friend.php',
                    data: data
                }).then((Response) => {
                    document.getElementById('remove-friend').id = 'send-request';
                })
            })
}})

//sending friend request
document.getElementById('send-request').addEventListener('click', () => {

    
    document.getElementById('send-request').id = 'pending'
    document.getElementById('pending').innerHTML = 'Request sent'

    let data = new FormData();
    data.append('request_from_id',localStorage.getItem('user_id'));
    data.append('request_to_id',localStorage.getItem('profile_id'));

    console.log("REMOVE FRIEND",localStorage.getItem('user_id'),localStorage.getItem('profile_id'))

    axios({
        method: 'POST',
        url: 'http://facebook/send_request.php',
        data: data
    }).then(Response => {
        console.log(Response)
    })

})



//getting requests

let requests_data = new FormData();
requests_data.append('user_id',localStorage.getItem('user_id'));

axios({
    method: 'POST',
    url: 'http://facebook/get_requests.php',
    data: requests_data
}).then((Response) => {
    console.log(Response.data)
    let requests_ul = document.getElementById('requests');
    Response.data.forEach((user) => {
        requests_ul.innerHTML += '<li id="'+user.source+'">'+
        '<img src="'+user.profile_picture+'">'+
        '<span>'+user.username+'</span>'+
        '<button class="accept">Accept</button>'+
        '<button class="reject">Reject</button></li>'
    })

    if(localStorage.getItem('user_id') != localStorage.getItem('profile_id')) {
        document.getElementById('requests').style.display = 'none';
    }

    //adding event listeners lo accept and reject
    let accept = document.getElementsByClassName('accept')
    
    Array.from(accept).forEach(function (element) {
        element.addEventListener('click', () => {
            

            console.log(element.parentElement.id)

            let accept_data = new FormData();
            accept_data.append('user_id',user_id);
            accept_data.append('profile_id',element.parentElement.id);
            axios({
                method:'POST',
                url:'http://facebook/accept_request.php',
                data:accept_data
            }).then((Response) => {
                $(element).parent().fadeOut(150);
            })
        })
      });

    let reject = document.getElementsByClassName('reject')
    
    Array.from(reject).forEach(function (element) {
        element.addEventListener('click', () => {
            

            console.log(element.parentElement.id)

            let reject_data = new FormData();
            accept_data.append('user_id',user_id);
            accept_data.append('profile_id',element.parentElement.id);
            axios({
                method:'POST',
                url:'http://facebook/reject_request.php',
                data:accept_data
            }).then((Response) => {
                $(element).parent().fadeOut(150);
            })
        })
      });

})


}





