let like_buttons = document.getElementsByClassName('like');

Array.from(like_buttons).forEach((button) => {
    // console.log(button.parentElement.parentElement)
    button.addEventListener('click', () => {
        console.log("CLICKED")
    })
  });