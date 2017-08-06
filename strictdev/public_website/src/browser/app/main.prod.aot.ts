import { enableProdMode } from '@angular/core';
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../../../aot/src/browser/app/app-module.ngfactory';

// depending on the env mode, enable prod mode or add debugging modules
enableProdMode();

export function main() {
  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
