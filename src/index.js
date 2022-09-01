
// // Описаний в документації

// // Додатковий імпорт стилів

import scroll from './js/scroll';



import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import LoadMoreBtnApi from './js/loadMore';
import PixabayApiService from './js/axiosAPI';



const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
// const loadMoreBtn = document.querySelector('.load-more');
const imgGallery = document.querySelector('.gallery');
const rus = ['ru', 'russ', 'russia', 'russian', 'putin', 'россия', 'росія', 'болото'];
// console.log(rus);

const pixabayApi = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtnApi({
  selector: '.load-more',
  hidden: true,
});


formEl.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArrPixab);

function onSearch(e) {
  e.preventDefault();
  pixabayApi.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();
  if (pixabayApi.searchQuery === '') {
    return onEmptyError();
  }
  if (pixabayApi.searchQuery === 'russia') {
    
    // return rusError();
    Notiflix.Notify.warning('russia boloto');
    rusError();
  }
// console.log(pixabayApi.searchQuery);


  // if (rus.includes(item => item === pixabayApi.searchQuery)) {
  //   console.log(pixabayApi.searchQuery);
  //   Notiflix.Notify.warning('russia boloto');
  // }
  
  loadMoreBtn.show();
  pixabayApi.resetPage();
  clearImgGallery();
  fetchArrPixab();
}

function clearImgGallery() {
  // if(imgGallery) {
    imgGallery.innerHTML = '';
  // }
  
}

function onFetchError(error) {
  Notiflix.Notify.warning('text...');
}

function onEmptyError(error) {
  Notiflix.Notify.warning('Поле пусте, введіть щось');
}

function renderImg({hits}) {
  const markupImg = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`

    )
    
    .join();
  imgGallery.insertAdjacentHTML('beforeend', markupImg);
//   console.log(arr);
}

function rusError() {
  
}




// function rusError() {
// const markupImg2 = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//   <a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="https://www.meme-arsenal.com/memes/33ece8b7a7e780c510454b4e29ba2809.jpg" alt="${tags}" loading="lazy"/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>`

//     )
    
    
//   imgGallery.insertAdjacentHTML('beforeend', markupImg2);
//   // console.log(markupImg2);
// }


// function fetchArrPixab() {
//   loadMoreBtn.disable();
//   pixabayApi.fetchImg().then(hits => {
//     renderImg(hits);
//     loadMoreBtn.enable();
//   });
// }

function fetchArrPixab() {
  loadMoreBtn.disable();
  pixabayApi.fetchImg().then(({ data }) => {
      if (data.total === 0) {
        Notiflix.Notify.info('text2');
        loadMoreBtn.hide();
        return;
      }

      renderImg(data);
      // lightbox.refresh();

      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

// function rusError() {
// const markupImg2 = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<div class="photo-card">
//   <a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="https://www.meme-arsenal.com/memes/33ece8b7a7e780c510454b4e29ba2809.jpg" alt="${tags}" loading="lazy"/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>`

//     )
    
    
//   imgGallery.insertAdjacentHTML('beforeend', markupImg2);
//   // console.log(markupImg2);
// }


// if (markupImg > 40) {
//     loadMoreBtn.classList.remove('is-hidden');
//   } else {
//     loadMoreBtn.classList.add('is-hidden');
//   }



