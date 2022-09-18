import { catchError, map, Observable } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { CityService } from "../services/city.service";
import { ICommonPagination } from "../../../shared/interfaces/common-pagination.interface";



export class CityPaginationModel implements ICommonPagination {

    constructor(
        private cityService: CityService,
        private notificationService: NotificationService) {
    }

    getDataService() {
        return this.cityService;
    }
    getNotificationService() {
        return this.notificationService;
    }

    getAllWithPagination(offset: number, pageSize: number, filter: string = ''): Observable<any> {
        return this.cityService.getAllWithPagination(offset, pageSize, filter).pipe(
            catchError(error => {
                throw error;
            }),
            map((res: any) => res)
        );
    }
}
