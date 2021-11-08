import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Meeting } from '../core/interfaces/meeting.interface';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  meetings: Meeting[] = [];
  adminMeetings: Meeting[] = [];
  loading = false
  loadingAdmin = false

  constructor(private apiService: ApiService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getUserMeetings()
    if(this.authService.isAdmin()) {
        this.getAdminMeetings()
    }
  }

  getUserMeetings() {
    this.loading = true
    this.apiService.get('user/meetings').subscribe((res) => {
      this.meetings = res
      this.loading = false
    });
  }

  getAdminMeetings() {
    this.loadingAdmin = true
    this.apiService.get('admin/meetings').subscribe((res) => {
      this.adminMeetings = res
      this.loadingAdmin = false
    })
  }

  removeMeeting(meetingId: any) {
    this.apiService.put('meetings/remove/' + meetingId).subscribe((res) => {
      this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
      Swal.fire(
        'Meeting eliminada',
        'Vos te lo perdes!',
        'success'
      )
    }, (err) => {
      Swal.fire(
        'Error',
        'No se te pudo eliminar de la reunión',
        'error'
      )
    })
  }

}
