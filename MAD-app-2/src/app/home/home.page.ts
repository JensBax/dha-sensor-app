import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { BookPage } from '../book/book.page';
import { Camera , CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx'
import { ActionSheetController } from '@ionic/angular';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // let ISBN = '0451526538';

  selectedImage: string
  imageText: string

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController) {}

  async selectSource(){
    let actionSheet = await this.actionSheetCtrl.create({
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

  getPicture(sourceType: PictureSourceType){
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then(imageData => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`
    })
  }

  recognizeImage(){
    Tesseract.recognize(this.selectedImage)
    .catch(err => console.error(err))
    .then(result => {
      this.imageText = result.text
    })
  }
}
