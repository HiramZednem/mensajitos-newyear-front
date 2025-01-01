import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para enviar datos HTTP
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para crear el formulario reactivo



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
})
export class ViewComponent {
  messageForm: FormGroup; // Definir el formulario
  isPopupVisible: boolean = false; // Controlar la visibilidad del popup
  messageUrl: string = ''; // Guardar el enlace del mensaje

  constructor(
    private http: HttpClient, // Para realizar las peticiones HTTP
    private fb: FormBuilder,  // Para usar el formulario reactivo
  ) {
    // Inicializar el formulario reactivo con validaciones
    this.messageForm = this.fb.group({
      reciver: ['', [Validators.required, Validators.minLength(3)]], // Validación de longitud mínima
      sender: ['', [Validators.required, Validators.minLength(3)]],  // Validación de longitud mínima
      msg: ['', [Validators.required, Validators.minLength(5)]] // Validación de longitud mínima para el mensaje
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.messageForm.valid) {
      const messageData = this.messageForm.value;

      this.http.post('https://mensajitos-api-495924555478.us-central1.run.app/create', messageData)
        .subscribe(
          (response: any) => {
            this.messageUrl = `${window.location.origin}/${response._id}`;
            this.isPopupVisible = true;
          },
          (error) => {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un error al crear el mensaje');
          }
        );
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.messageUrl).then(() => {
      alert('Enlace copiado al portapapeles');
    });
  }

  shareOnWhatsApp(): void {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('🎉 Mira este mensaje: ' + this.messageUrl)}`;
    window.open(whatsappUrl, '_blank');
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }
}
