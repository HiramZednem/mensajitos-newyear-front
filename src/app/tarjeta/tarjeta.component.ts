import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
})
export class TarjetaComponent implements OnInit {
  uuid: string | null = null;
  messageData: { reciver: string, sender: string, msg: string } | null = null;

  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private http: HttpClient        // Para hacer la petición HTTP
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'uuid' desde la URL
    this.uuid = this.route.snapshot.paramMap.get('uuid');

    // Si el UUID existe, realiza una petición HTTP
    if (this.uuid) {
      this.getDataByUuid(this.uuid);
    }
  }

  // Función para hacer la petición HTTP con el UUID
  getDataByUuid(uuid: string): void {
    const apiUrl = `https://mensajitos-back-bueno.vercel.app/${uuid}`;  // Cambia esta URL por tu API

    this.http.get(apiUrl).subscribe(
      (response) => {
        console.log('Datos recibidos:', response);
        this.messageData = response as { reciver: string, sender: string, msg: string };  // Guardar los datos recibidos
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
}
