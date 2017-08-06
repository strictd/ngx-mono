import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app-module';

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}

