import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para enviar datos HTTP
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para crear el formulario reactivo



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
})
export class ViewComponent {
  messageForm: FormGroup; // Definir el formulario

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
      // Preparar los datos a enviar
      const messageData = this.messageForm.value;

      // Realizar la petición HTTP POST
      this.http.post('https://mensajitos-api-495924555478.us-central1.run.app/create', messageData)
        .subscribe(
          (response) => {
            console.log('Mensaje enviado con éxito:', response);
            alert('Mensaje creado con éxito!');
            this.messageForm.reset(); // Resetear el formulario después de enviarlo

            const messageId = (response as any)._id;
            // const messageUrl = `http://localhost:4200/${messageId}`;
            const currentDomain = window.location.origin;
            const messageUrl = `${currentDomain}/${messageId}`;
            console.log('URL del mensaje:', messageUrl);
            navigator.clipboard.writeText(messageUrl).then(() => {
              alert(`Comparte el enlace copiado al portapapeles`);
            }).catch(err => {
              console.error('Error al copiar el enlace al portapapeles:', err);
              alert(`Comparte este enlace: ${messageUrl}`);
            });
          },
          (error) => {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un error al crear el mensaje');
          }
        );
    } else {
      // Si el formulario no es válido, mostrar una advertencia
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
