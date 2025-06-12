const menu = document.querySelector("#menu");
const menuView = document.querySelector("#menuView");
const modal = document.querySelector("#modal");
const view = document.querySelector("#view");
const closes = document.querySelector("#close");

// view.addEventListener("click", () => {
//   showModal();
// });
closes.addEventListener("click", () => {
  hideModal();
});

function hideModal() {
  menuView.removeChild(modal);
}
hideModal();
function showModal() {
  // menuView.append(modal);
  console.log("message")


  const modalEl = `<div
              id="modal"
              class="flex justify-center items-center absolute top-52 left-52 z-50">
              <div class="bg-white rounded-lg shadow-xl">
                <img
                  src=
                  alt="Card Img"
                  class="rounded-tr-lg rounded-tl-lg w-lg mx-auto my-10" />

                <div class="px-5 py-3">
                  <h3 class="text-2xl font-semibold"> </h3>
                  <p class="w-3xl">
                    {value.strInstructions}
                  </p>
                  <div class="flex flex-row justify-end items-center my-3">
                    <button
                      id="close"
                      class="bg-amber-400 hover:bg-amber-700 text-white text-sm p-2 mt-3 rounded">
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
    const div = document.createElement("div");
    div.id ="menuView"
    div.innerHTML = modalEl;
}

