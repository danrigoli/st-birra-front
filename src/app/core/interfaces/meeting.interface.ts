import { User } from "./user.interface";

export interface Meeting {
    id: number,
    title: string,
    dateFormatted: string,
    place: string,
    description: string,
    weather: any | null,
    users: User[]
}

export class Meeting {
    constructor(meetingData: Meeting) {
        this.id = meetingData.id;
        this.title = meetingData.title;
        this.dateFormatted = meetingData.dateFormatted;
        this.place = meetingData.place;
        this.description = meetingData.description;
        this.weather = meetingData.weather;
        this.users = meetingData.users;
    }
}