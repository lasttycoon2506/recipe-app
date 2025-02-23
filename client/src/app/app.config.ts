import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([jwtInterceptor])),
		provideAnimations(),
		provideToastr({ positionClass: 'toast-bottom-right' }),
		importProvidersFrom(
			NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
		),
	],
};
