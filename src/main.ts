import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread the appConfig object
  providers: [
    ...appConfig.providers, // Spread the existing providers from appConfig
    provideAnimations(), // Add the animations support
  ],
}).catch((err) => console.error(err));
