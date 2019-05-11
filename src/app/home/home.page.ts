import { Component, ViewChild } from '@angular/core';
import { ToastController, IonSlides, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('slider') slider: IonSlides;
  surveyCode: Number = 100000;
  survey: Survey = {School: "a", Secjalization: "b", Semestr: "c", Lecturer: "d", Course: "e", Group: "f"};
    constructor(private toastController: ToastController,
                private alertController: AlertController) {
  }
  async ngOnInit(){
    const toast = await this.toastController.create({
      message: 'Wypełnij sumiennie ankietę',
      duration: 3000,
      closeButtonText: 'OK',
      color: 'warning',
      position: "bottom",
      showCloseButton: true
    });
    toast.present();
  }
  async checkSurveyCode(){
    var prevSlide = await this.slider.getPreviousIndex();
    var curSlide = await this.slider.getActiveIndex();
    if( (prevSlide == 0 && curSlide == 1) && (this.surveyCode < 100000 || this.surveyCode > 999999) ){
      this.slider.slideTo(0, 1000);
      const alert = await this.alertController.create({
        header: 'Zły kod ankiety',
        message: 'kod ankiety musi być z przedziału 100000-999999',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}

interface Survey {
  School: string;
  Secjalization: string;
  Semestr: string;
  Lecturer: string;
  Group: string;
  Course: string;
}