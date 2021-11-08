import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];
  week = false;
  loading = false
  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadMeetings();
  }

  loadMeetings() {
    if (this.week) this.apiService.get('meetings/week').subscribe((res) => {
      this.meetings = res
      this.loading = false;
    });
    else this.apiService.get('meetings/all').subscribe((res) => {
      this.meetings = res
      this.loading = false;
    });
    this.week = !this.week;
  }

  joinMeeting(meetingId: any) {
    this.apiService.put('meetings/add/' + meetingId).subscribe((res) => {
      this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
      Swal.fire(
        'Meeting anotada',
        'Te esperamos!',
        'success'
      )
    }, (err) => {
      Swal.fire(
        'Error',
        'No se te pudo agregar a la reunión',
        'error'
      )
    })
  }

}
