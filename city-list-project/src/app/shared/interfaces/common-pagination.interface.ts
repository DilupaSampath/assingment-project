import { Observable } from "rxjs";

export interface ICommonPagination {
    
    getAllWithPagination(offset: number, pageSize: number, filter: string): Observable<any>;

    getDataService(): any;

    getNotificationService(): any;
}