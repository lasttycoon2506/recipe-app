import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	private spinnerService = inject(NgxSpinnerService);
	loadingCount = 0;

	loading() {
		this.loadingCount++;
		this.spinnerService.show(undefined, {
			type: 'ball-scale-multiple',
			bdColor: 'rgba(0, 0, 0, 0.8)',
			color: '#fff',
		});
	}

	idle() {
		this.loadingCount--;
		this.spinnerService.hide();
	}
}
