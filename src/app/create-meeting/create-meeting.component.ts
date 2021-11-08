import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent {
  meetingForm: FormGroup;
  provincias: any[] = [];
  municipios: any[] = [];
  constructor(private apiService: ApiService, private http: HttpClient, 
    private formBuilder: FormBuilder, private router: Router) {
    this.getProvincias()
    this.meetingForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, Validators.required],
      provincia: [null, Validators.required],
      place: [null, Validators.required],
      date: [null, Validators.required],
    })
    this.meetingForm.get('place')?.disable()
   }


   getProvincias() {
     this.http.get('https://apis.datos.gob.ar/georef/api/provincias').subscribe((res: any) => {
        this.provincias = res['provincias'];
      });
    }

    getMunicipios() {
      this.http.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.meetingForm.get('provincia')?.value}`).subscribe((res: any) => {
         this.municipios = res['municipios'];
         this.meetingForm.get('place')?.enable()
       });
     }

     submit() {
      this.apiService.post('meetings', this.meetingForm.value).subscribe(res => {
        console.log(res)
        this.router.navigate(['/'])
        Swal.fire(
          'Meeting creada',
          'Invita a gente!',
          'success'
        )
      }, (err) => {
        Swal.fire(
          'Error',
          'No se pudo crear la reunión',
          'error'
        )
      })
     }

}
