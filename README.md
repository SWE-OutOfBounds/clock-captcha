# Clock CAPTCHA - V1.0
CAPTCHA module delivery service. Usable in web application to reduce bot spam and other pain.

### INSTALL
Install library typing `npm install clock-captcha` in your project folder.

### USAGE

1. `import { captchaModule } from 'clock-captcha'`,
2. `captchaModuleIstance = new captchaModule()`,
3. `<div id="clock-captcha"></div>`,
4. `captchaModuleIstance.show(<HTMLElement created on point 3>)`,
5. Before submit check if `captchaModuelIstance.isHuman()`.

### CREDITS
1. **License**: MIT,
2. **Author** : OutOfBounds.