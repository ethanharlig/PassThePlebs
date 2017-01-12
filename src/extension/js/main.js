/**
 * @author Tim Stoddard <tim.stoddard2@gmail.com>
 */

import { PolyratingIntegrator } from './add-polyratings';
import { PassLayoutFixer } from './fix-pass-layout';
import { defaults, optionNames } from '../../shared/defaults';
import { DNE, value } from '../../shared/utils';

export class PassExtension {
  start() {
    chrome.storage.sync.get(optionNames, (options) => {
      this.addDefaults(options);
      let integrator = new PolyratingIntegrator(options.showBackgroundColors, options.hideStaffClasses);
      integrator.addPolyratings();
      let fixer = new PassLayoutFixer(options);
      fixer.fixPassLayout();
    });
  }

  addDefaults(options) {
    optionNames.forEach((name) => {
      options[name] = value(options[name], defaults[name]);
    });
  }
}
