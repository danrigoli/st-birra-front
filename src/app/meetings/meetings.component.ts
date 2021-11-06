import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];
  loading = false
  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.get('meetings/week').subscribe((res) => {
      this.meetings = res
      this.loading = false;
    });
  }

  joinMeeting(meetingId: any) {
    this.apiService.put('meetings/add/' + this.authService.getId()).subscribe((res) => {
      this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
    })
  }

}
