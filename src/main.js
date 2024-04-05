// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";
// import { getImages} from './js/pixabay-api';
// import { renderMarkup } from './js/render-functions';  

// let query;
// let page = 1;
// let perPage = 15;
// let maxPage = 0;
// let currentPage = 1;
// const btnLoadMore = document.querySelector(".js-load-more");
// const gallery  = document.querySelector(".gallery");
// const preloader = document.querySelector(".loader");
// const form = document.querySelector(".js-form");

// function showLoader() {
//   preloader.classList.remove("is-hidden")
// };
// function hideLoader() {
// preloader.classList.add("is-hidden")
// };

// function showLoadMore() {
//   btnLoadMore.classList.remove("is-hidden");
// }
// function hideLoadMore() {
//   btnLoadMore.classList.add("is-hidden");
// }


// form.addEventListener("submit", validInput);

// async function validInput(event) {

//     event.preventDefault();

//     gallery.innerHTML = "";

//     query = event.target.elements.search.value.trim();

//     showLoader();
    
//     if (query === "" ) {
//         iziToast.warning({
//             color: 'yellow',
//             message: "Please fill in the field for search!",
//             position: 'topRight'
//         })
//         return
//     }
//     await getImages(query)
    
//   try {
//     const data = await getImages(query);
//         if (data.hits.length === 0) {

//             maxPage = Math.ceil(data.totalHits / perPage);
//             iziToast.error({
//                 message: "Sorry, there are no images matching your search query. Please try again!",
//                 backgroundColor: "red",
//                 messageColor: "white",
//                 position: 'topRight'
//             })
//         }
//         renderMarkup(data.hits)

//         event.target.reset();
//         return
//     } catch {
//         iziToast.error({
//             title: 'Error',
//             message: `Sorry, there are no images matching your search query. Please, try again!`,
//             position: 'topRight'
//         }
//         )
//             // .finally(() => hideLoader())
//     }
// }



// btnLoadMore.addEventListener("click", onLoadMore);

// async function onLoadMore() {
//   currentPage += 1;
//   hideLoadMore();
//   showLoader();
//   try {
//     const data = await getImages(query, currentPage); 
//     renderImages(data.hits);
//   } catch (error) {
//     iziToast.error({
//     message: 'Sorry, an error occurred while loading. Please try again!',
//     theme: 'dark',
//     progressBarColor: '#FFFFFF',
//     color: '#EF4040',
//     position: 'topRight',
//     });
//   }
//   hideLoader();
//   myScroll();
//   checkButtonStatus();
// }


// function checkButtonStatus() {
//   if (currentPage >= maxPage) {
//     hideLoadMore();
//     iziToast.info({
//       message: "We're sorry, but you've reached the end of search results.",
//       theme: "dark",
//       progressBarColor: "#FFFFFF",
//       color: "blue",
//       position: "topRight",
//     });
//   } else {
//     showLoadMore();
//   }
// }

// function myScroll() {
//   const height = gallery.firstChild.getBoundingClientRect().height;

//   scrollBy({
//     top: height,
//     behavior: 'smooth',
//   });
// }









import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImages} from './js/pixabay-api';
import { renderMarkup } from './js/render-functions';
let query;
let page = 1;
let perPage = 15;
let maxPage = 0;
let currentPage = 1;
const gallery  = document.querySelector(".gallery");
const preloader = document.querySelector(".loader");
const form = document.querySelector(".js-form");
const btnLoadMore = document.querySelector(".js-load-more");
function showLoader() {
  preloader.classList.remove("is-hidden")
};
function hideLoader() {
preloader.classList.add("is-hidden")
};
function showLoadMore() {
  btnLoadMore.classList.remove("is-hidden");
}
function hideLoadMore() {
  btnLoadMore.classList.add("is-hidden");
}
form.addEventListener("submit", validInput);

async function validInput(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    query = event.target.elements.search.value.trim();
    showLoader();
    if (query === "" ) {
        iziToast.warning({
            color: 'yellow',
            message: "Please fill in the field for search!",
            position: 'topRight'
        })
        return
    }
    await getImages(query)
  try {
    const data = await getImages(query, currentPage);
    showLoadMore()
        if (data.hits.length === 0) {
            maxPage = Math.ceil(data.totalHits / perPage);
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                backgroundColor: "red",
                messageColor: "white",
                position: 'topRight'
            })
        }
        renderMarkup(data.hits)
        event.target.reset();
        return
    } catch {
        iziToast.error({
            title: 'Error',
            message: `Sorry, there are no images matching your search query. Please, try again!`,
            position: 'topRight'
        }
        ).finally(() => hideLoader())
    }
}
btnLoadMore.addEventListener("click", onLoadMore);
async function onLoadMore() {
  currentPage += 1;
  hideLoadMore();
  showLoader();
  try {
    const data = await getImages(query, currentPage);
    renderImages(data.hits);
  } catch (error) {
    iziToast.error({
    message: 'Sorry, an error occurred while loading. Please try again!',
    theme: 'dark',
    progressBarColor: '#FFFFFF',
    color: '#EF4040',
    position: 'topRight',
    });
  }
  hideLoader();
  myScroll();
  checkButtonStatus();
}
function checkButtonStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      theme: "dark",
      progressBarColor: "#FFFFFF",
      color: "blue",
      position: "topRight",
    });
  } else {
    showLoadMore();
  }
}
function myScroll() {
  const height = gallery.firstChild.getBoundingClientRect().height;
  scrollBy({
    top: height,
    behavior: 'smooth',
  });
}