import { Component } from '@angular/core';
import { Camera , CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ISBN = '';

  selectedImage: string;
  imageText: string;

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController, private ocr: OCR) {}

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
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then(imageData => {
      this.selectedImage = imageData;
      console.log(this.selectedImage);
      this.recognizeImage();
    });
  }

  recognizeImage() {
    this.ocr.recText(OCRSourceType.NORMFILEURL, this.selectedImage)
      .then((res: OCRResult) => {console.log(res); this.parseImageText(res); })
      .catch((error: any) => console.error(error));
  }

  parseImageText(imageText: OCRResult) {
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
  }
}
