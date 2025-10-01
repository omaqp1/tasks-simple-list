const checkboxes = document.querySelectorAll("input");
function handleCheck(event) {
const title  = document.getElementById("title1");
    if (event.target.checked) {
        title.style.textDecoration = "line-through"
        title.style.color = "green"
    } else {
        title.style.textDecoration = "none"
        title.style.color = "red"
    }
}
function handleCheck2(event) {
const title  = document.getElementById("title2");
    if (event.target.checked) {
        title.style.textDecoration = "line-through"
        title.style.color = "green"
    } else {
        title.style.textDecoration = "none"
        title.style.color = "red"
    }
}
