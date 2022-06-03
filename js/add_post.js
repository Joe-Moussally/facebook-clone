const photo = document.getElementById('photo');
let url = 'http://facebook/add_post.php'
let userId = localStorage.getItem('user_id');
var base64;


//adding event listener to uplaod button

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.getElementById('upload-post-button').addEventListener('click',function(e) {

    e.preventDefault();

    const uploadedFile = document.querySelector('#photo').files[0];
    toBase64(uploadedFile)
    .then(res => {
        console.log(res)
        let description = document.getElementById('description-text').value;

        let data = new FormData();
        data.append('description',description);
        data.append('user_id',userId)
        data.append('base64',res)
    
        axios({
            method: 'POST',
            url: url,
            data:data,
        }).then((Response) => {
            console.log(Response.data);
        })

    })
    .catch(err => {
        console.log(err);
    })
});