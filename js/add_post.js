const photo = document.getElementById('photo');
let url = 'http://facebook/add_post.php'
let description = document.getElementById('description-text').value;
let userId = localStorage.getItem('user_id')


//adding event listener to uplaod button
document.getElementById('upload-post-button').addEventListener('click', (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('photo',photo.files[0]);
    data.append('description',description);
    data.append('user_id',userId)

    axios({
        method: 'POST',
        url: url,
        data:data,
        enctype: 'multipart/form-data'
    }).then((Response) => {
        console.log(Response.data);
    })
})

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
// }

// var file64 =document.getElementById('photo').file;
// getBase64(file).then(
//     data => console.log(data)
// );

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.getElementById('upload-post-button').addEventListener('click',function() {
    const uploadedFile = document.querySelector('#photo').files[0];
    toBase64(uploadedFile)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
});