import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';
import { api_endpoints } from '../../constants/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getActiveTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(api_endpoints.api + api_endpoints.task.get_tasks + '1');
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(api_endpoints.api + api_endpoints.task.get_tasks + '2');
  }

  create(task: Task): Observable<any> {
    return this.http.post(api_endpoints.api + api_endpoints.task.create, task, { responseType: 'text' });
  }

  update(task: Task): Observable<any> {
    return this.http.put(api_endpoints.api + api_endpoints.task.update, task, { responseType: 'text' });
  }

  updateStatus(id: number): Observable<any> {
    return this.http.put(api_endpoints.api + api_endpoints.task.update_status, id, { responseType: 'text' });
  }

  delete(taskId: number): Observable<any> {
    return this.http.delete(api_endpoints.api + api_endpoints.task.delete + taskId, { responseType: 'text' });
  }

  deleteAll(): Observable<any> {
    return this.http.delete(api_endpoints.api + api_endpoints.task.delete_all, { responseType: 'text' });
  }
}
