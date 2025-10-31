const year = document.querySelector("#date");
 today = new Date();
 year.textContent = today.getFullYear()


const modified = document.querySelector("#lastModified");

modified.textContent = new Date ( document.lastModified)