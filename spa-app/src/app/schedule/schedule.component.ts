import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  standalone: false
})
export class ScheduleComponent implements OnInit {
  days = [
    { name: 'Понедельник', startTime: '00:00', endTime: '24:00' },
    { name: 'Вторник', startTime: '00:00', endTime: '24:00' },
    { name: 'Среда', startTime: '00:00', endTime: '24:00' },
    { name: 'Четверг', startTime: '00:00', endTime: '24:00' },
    { name: 'Пятница', startTime: '00:00', endTime: '24:00' },
    { name: 'Суббота', startTime: '00:00', endTime: '24:00' },
    { name: 'Воскресенье', startTime: '00:00', endTime: '24:00' }
  ];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.getSchedule().subscribe(data => {
      this.days = data;
    });
  }

  saveSchedule() {
    this.scheduleService.saveSchedule(this.days).subscribe(() => {
      alert('Расписание сохранено');
    });
  }

  checkSchedule() {
    this.scheduleService.checkSchedule().subscribe(() => {
    });
  }
}