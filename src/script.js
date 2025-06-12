const menu = document.querySelector("#menu");
const submit = document.querySelector("#submit");

const dataInput = document.querySelector("#dataInput");
submit.addEventListener("click", inputData);

function inputData(e) {
  const dataInput = document.querySelector("#dataInput");
  const val = dataInput.value.trim().toLowerCase();

  if (dataInput.value.trim() !== "") {
    const nameUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`;
    getData(nameUrl);
  } else if (dataInput.value.trim() == "") {
    const errorUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`;
    getData(errorUrl);
  } else {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    getData(url);
  }
  dataInput.value = "";
}

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function getData(url) {
  //   console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    let element = data.meals.map((value) => {
      //   console.log(value);
      const foodId = value.idMeal;
      // console.log(foodId)
      const foodName = value.strMeal;
      const info = value.strInstructions;
      const foodInfo = value.strInstructions.slice(0, 50);
      const foodImges = value.strMealThumb;

      const card = `<div class="w-72 bg-white rounded-lg shadow-xl">
            <img
              src=${foodImges}
              alt="Card Img"
              class="rounded-tr-lg rounded-tl-lg" />

            <div class="px-5 py-3">
              <h3 class="text-2xl font-semibold">${foodName}</h3>
              <p class="">
                ${foodInfo}
              </p>
              <div class="flex flex-row justify-end items-center my-3">
                <button
                  id="${foodId}"
                  onclick="showModal(${foodId})"
                  class="bg-amber-400 hover:bg-amber-600 text-white text-sm p-2 mt-3 rounded relative">
                  VIEW DETAILS
                </button>
              </div>
            </div>

            
            
          </div>
   `;
      return card;
    });

    menu.innerHTML = element;
    // console.log(menu)
  } catch (error) {
    menu.innerHTML = `<h1 class="text-2xl text-red-600 text-center mx-auto">Your URL Data not Found </h1>`;

    console.error(error.message);
  }
}
getData(url);

// Modal start

async function showModal(id) {
  const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  // console.log(id);
  const idDiv = document.getElementById(`${id}`).parentNode;
  // console.log(idDiv);
  try {
    const response = await fetch(idUrl);
    const idData = await response.json();
    const ranId = parseInt(Math.random() * 100);
    const subDiv = document.createElement("div");
    subDiv.id = ranId;
    // subDiv.className = "relative";
    const modal = idData.meals.map((data) => {
      const food = data.strMeal;
      const info = data.strInstructions;
      const img = data.strMealThumb;
      // console.log(id)
      const modalEl = `<div
              id="${ranId}"
              class="flex justify-center items-center absolute top-100 right-100 z-50">
              <div class="bg-white rounded-lg shadow-xl w-5xl">
                <img
                  src=${img}
                  alt="Card Img"
                  class="rounded-tr-lg rounded-tl-lg w-lg mx-auto my-10" />

                <div class="px-5 py-3 ">
                  <h3 class="text-2xl font-semibold px-7 "> ${food}</h3>
                  <p class="w-3xl p-7 shadow-sm">
                    ${info}
                  </p>
                  <div class="flex flex-row justify-end items-center my-3">
                    <button
                      onclick="hideModal(${ranId})"
                      class="bg-amber-400 hover:bg-amber-700 text-white text-sm p-2 mt-3 rounded">
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
      return modalEl;
    });

    subDiv.innerHTML = modal;
    idDiv.append(subDiv);

    // const closes = document.querySelector("#close");
    // console.log(subDiv)
    // closes.addEventListener("click", (e) => {
    //   // console.log(e.target);
    //   // console.log("message")
    //   hideModal();
    // });

    // function hideModal(para) {
    //   // console.log(para)
    //   console.log(subDiv)
    //   idDiv.removeChild(subDiv);
    // }
  } catch (error) {
    menu.innerHTML = `<h1 class="text-2xl text-red-600 text-center mx-auto">Your URL Data not Found </h1>`;

    console.error(error.message);
  }

  // menuView.append(modal);
}

function hideModal(ranId) {
  // console.log(para)
  const removeEl = document.getElementById(`${ranId}`);
  // console.log(removeEl);
  const remParent = removeEl.parentNode;
  // console.log(removeEl.parentNode);
  remParent.removeChild(removeEl);
}
