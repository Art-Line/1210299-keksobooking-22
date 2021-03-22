import { removeChildElements } from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_WIDTH = 40;
const IMG_HEIGHT = 40;
const DEFAULT_AVATAR_IMG = './img/muffin-grey.svg';

const fileAvatarChooser = document.querySelector('.ad-form-header__input');
const previewAvatarContainer = document.querySelector('.ad-form-header__preview');
const filePhotoAdsChooser = document.querySelector('.ad-form__input');
const previewPhotoAdsContainer = document.querySelector('.ad-form__photo');

const uploadImages = (fileChooser, previewContainer) => {

  fileChooser.addEventListener('change', () => {

    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (matches) {

      const reader = new FileReader();
      let previewImg = previewContainer.querySelector('.ad-form-header__preview img');

      if (previewImg === null) {
        previewImg = document.createElement('img');
        previewImg.setAttribute('width', IMG_WIDTH);
        previewImg.setAttribute('height', IMG_HEIGHT);
        previewContainer.appendChild(previewImg);
      }

      reader.addEventListener('load', () => {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);

    }

  });

};

uploadImages(fileAvatarChooser, previewAvatarContainer);
uploadImages(filePhotoAdsChooser, previewPhotoAdsContainer);

const resetAvatarImg = () => {
  let previewAvatarImg = previewAvatarContainer.querySelector('.ad-form-header__preview img');
  previewAvatarImg.src = DEFAULT_AVATAR_IMG;
}

const resetPhotoAdsImg = () => {
  removeChildElements(previewPhotoAdsContainer);
}

export { resetAvatarImg, resetPhotoAdsImg };
