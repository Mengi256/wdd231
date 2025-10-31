const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation")
menu.addEventListener("click",function(){
    menu.classList.toggle("show");
    navigation.classList.toggle("show")
})