import { Component } from '@angular/core';
import { Camera , PictureSourceType} from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ISBN = '';

  selectedImage: string;
  imageText: string;

  isScanning = false;

  constructor(private camera: Camera,
              private actionSheetCtrl: ActionSheetController,
              private ocr: OCR,
              public toastController: ToastController) {}

  async selectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType,
      allowEdit: false,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then(imageData => {
      this.isScanning = true;
      this.selectedImage = imageData;
      console.log(this.selectedImage);
      this.recognizeImage();
    });
  }

  recognizeImage() {
    this.ocr.recText(OCRSourceType.NORMFILEURL, this.selectedImage)
      .then((res: OCRResult) => {
        console.log(res);
        this.parseImageText(res);
      })
      .catch((error: any) => {
        console.error(error);
        this.isScanning = false; });
  }

  parseImageText(imageText: OCRResult) {
    this.ISBN = '';

    if (imageText.words !== undefined) {
      const words = imageText.words.wordtext;

      // tslint:disable-next-line:forin
      for (let index = 0; index < words.length; index++) {
        const word = words[index];
        if (word.toLowerCase().includes('isbn')) {
          if (/\d/.test(words[index + 1])) {
            const found = words[index + 1];
            console.log(found);
            this.ISBN = words[index + 1];
            break;
          }
        }
      }

      this.isScanning = false;
    }

    if (this.ISBN === '') {
      this.noIsbnFound();
    }
  }

  async noIsbnFound() {
    const toast = await this.toastController.create({
      message: 'We didn\'t find an ISBN code.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
