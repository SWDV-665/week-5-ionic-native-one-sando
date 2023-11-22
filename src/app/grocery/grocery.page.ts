import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonIcon, IonFab, IonFabButton, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { create, trash, add, share } from 'ionicons/icons';
import { ToastController } from '@ionic/angular';
import { GroceryServiceService } from '../grocery-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonItemOptions, IonItemOption, IonItemSliding, CommonModule, IonIcon, IonFab, IonFabButton, IonButton ],
})

export class GroceryPage {
  constructor(private toastController: ToastController, private groceryService: GroceryServiceService, private inputDialogService: InputDialogServiceService) {
    addIcons({ trash, create, add, share });
  }

  title = 'Grocery List'

  loadItems() {
    return this.groceryService.getItem()
  }

  removeItem(item: any, index: number) {
    console.log('Removing ', item)
    this.groceryService.removeItem(index)
    this.presentToast(`${item.name} has been deleted.`);
  }

  async shareItem(item: any, index: number) {
    console.log('Sharing ', item, index)
    await Share.share({
      title: 'Item',
      text: 'Name:' + item.name + 'Qauntity:' + item.quantity,
    });
    this.presentToast(`${item.name} has been shared.`);
  }

  editItem(item: any, index: number) {
    console.log('Editing ', item)
    this.inputDialogService.promptAlert(item, index)
    this.presentToast(`${item.name} has been edited.`);
  }

  addItem() {
    console.log('Adding Item')
    this.inputDialogService.promptAlert()
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
    });
    await toast.present();
  }
}