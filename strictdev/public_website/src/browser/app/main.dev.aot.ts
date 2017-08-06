import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../../../aot/src/browser/app/app-module.ngfactory';

export function main() {
  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
