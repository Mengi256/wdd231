
const members_container = document.querySelector("#members-container");


async function getMembers(){
    const response = await fetch("data/members.json");
    const data = await response.json();
    
    Displaymembers(data.members)
}

function Displaymembers (members){
    members_container.innerHTML = '';
    members.forEach(member => {
        const div = document.createElement("div")
        div.classList.add('member-box')
        div.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h1> ${member.name}</h1>
        <p>${member.address}</p>
        <p>${member.phoneNumber}</p>
        <p><strong> Membership:</strong><span>${member.membership}</span></p>
        <a href="${member.website}">Visit Our Website</a>
        
`
        members_container.appendChild(div)
    });

}
getMembers()





const  year = document.querySelector("#year")
const today = new Date()
year.textContent = today.getFullYear()

const lastmodified = document.querySelector("#lastmodified")
lastmodified.textContent = `LastModified: ${document.lastModified}`

const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation")
const header_img_box = document.querySelector(".header-img-box");
menu.addEventListener("click",function(){
    menu.classList.toggle("show");
    navigation.classList.toggle("show");
    header_img_box.classList.toggle("show")
})