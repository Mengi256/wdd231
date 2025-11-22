// const modal = document.querySelector('#myModal');
// const closeModal = document.querySelector('#closeModal');
// modal.showModal(); // display the modal dialog right away.
// // Usually you will want to wait for a user action to show the modal dialog
// closeModal.addEventListener('click', () => {
//   modal.close();
// });
const modal = document.querySelector("#signup");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});