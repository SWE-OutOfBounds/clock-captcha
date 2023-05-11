# Clock CAPTCHA - V1.0
CAPTCHA service usable in web application to reduce bot spam and other pain.

---

### FRONT-END ( ``ClockCAPTCHAView()`` )

#### Interface

| Functions                              | Summary                                              | Return  | Examples                                                          |
|----------------------------------------|------------------------------------------------------|---------|-------------------------------------------------------------------|
| constructor()                          | Builds the module and trigger the load animation     | -       | ``captchaModule = new ClockCAPTCHAView()``                        |
| inject(container : HTMLElement)        | Place the module into a HTML container               | boolean | ``captchaModule.inject(document.getElementById('clock-captcha'))`` |
| fill(image_src: string, token: string) | Fill the module with an image and the relative token | void    | ``captchaModule.fill(res.body.image, res.body.token) ``           |
| getToken()                             | Return the token contained in the module             | string  | ``captchaModule.getToken()``                                      |
| getInput()                             | Returns the input field content                      | string  | ``captchaModule.getInput()``                                      |
| error(message: string)                 | Display an error message to the user                 | void    | ``captchaModule.error("Wrong input! Try again.")``                |
| message(msg: string)                   | Display an info message to the user                  | void    | ``captchaModule.message("Please tell the time!")``                |
| clear()                                | Cleans the module content and trigger load animation | void    | ``captchaModule.clear()``                                         |

#### Usage example in ANGULAR environment

This library provides:
1. back-end components that :
    1. generates some data and their visual representation
    2. validate some user interpretation of this one
2. front-end component that :
    1. display the data to the user
    2. collect his interpretation

The implementations of their communication is totally up to the developer.

##### Full module build

```typescript
    
    private captchaModule: ClockCAPTCHAView | null = null;
    
    ngOnInit(): void {
    this.captchaModule = new ClockCAPTCHAView();
    this.captchaModule.inject(document.getElementById('clock-captcha'));
    this._ccService.ccInit().subscribe(
      (response) => {
        response.cc_content && response.cc_token ? this.captchaModule?.fill(response.cc_content, response.cc_token) : null;
      }
    );
  }

```

In this example ``_ccService.ccInit()`` calls the back-end to retrieve the image content and the relative token.

##### Get captcha result and handle it

```typescript
    
    signUp(): void {
    this._ccService.validate(this.captchaModule.getToken(), this.captchaModule.getInput()).subscribe(result =>{
        if(result.okay){
            this._otherService.signUp(/*... signUp data ...*/, result.token).subscribe(result=>{
                // result handle
            })
        }else{
            //clearing captcha and refilling it with new data
            this.captchaModule.clear();
            this._ccService.ccInit().subscribe((response) => {
                response.cc_content && response.cc_token ? this.captchaModule?.fill(response.cc_content, response.cc_token) : null;
            }
        }
    }
  }

```
In this example ``_ccService`` has a function ``validate(token: string, input: string)`` that asks the backend if the user input is a solution of the captcha. If the result is okay, the back end return a onetime token that can be used by ``signUp`` function of another dedicated angular service, as ``security pass`` to perform the signUp.

### BACK-END

#### Components

| extends/implements           | Type           | Name                         | Constructor                                                              |
|------------------------------|----------------|------------------------------|--------------------------------------------------------------------------|
| -                            | class          | ClockCAPTCHA                 | ``ClockCaptcha()``                                                       |
| -                            | class          | ClockImageGenerator          | ``ClockImageGenerator(strategy: ClockImageGenerationStrategy)``           |
| -                            | Interface      | ClockImageGenerationStrategy | -                                                                        |
| ClockImageGenerationStrategy | Interface      | HTMLCanvasStrategy           | -                                                                        |
| HTMLCanvasStrategy           | class          | HTMLCanvasGenerator          | ``HTMLCanvasGenerator()``                                                |
| HTMLCanvasStrategy           | abstract class | HTMLCanvasDecorator          | -                                                                        |
| HTMLCanvasDecorator          | class          | NoiseDecorator               | ``NoiseDecorator(component:HTMLCanvasStrategy, noiseFactor: number)``    |
| HTMLCanvasDecorator          | class          | ShapesDecorator              | ``ShapesDecorator(component:HTMLCanvasStrategy, shapePresence: number)`` |

#### Methods

| Firm                                                          | Returns                                 | Throws                                |
|---------------------------------------------------------------|-----------------------------------------|---------------------------------------|
| generateData(password, img_generator: ImageGenerator): Object | object = {image: string, token: string} | Error on password format.             |
| validateData(data :object): boolean                           | operation outcome                       | Errors on "data" input object format  |

#### Descriptions

| Name                         | Description                                                                  |
|------------------------------|------------------------------------------------------------------------------|
| ClockCAPTCHA                 | Generates and validates data for and from ClockCAPTCHAView                   |
| ClockImageGenerator          | Components that generate a clock image from hours and minutes values         |
| ClockImageGenerationStrategy | Algorithm that creates an analog clock image                                 |
| HTMLCanvasStrategy           | HTMLCanvas version of ClockImageGenerationStrategy                           |
| HTMLCanvasGenerator          | Strategy element for ClockImageGenerator, generate simple analog clock image |
| HTMLCanvasDecorator          | Decorator pattern                                                            |
| NoiseDecorator               | Noise Decorator                                                              |
| ShapesDecorator              | Shape Decorator                                                              |

#### Usage example in node.js environment

##### Generate data for view component

```javascript
    import * as cc from 'path/to/index';
    
    var onlyClockStrategy = new cc.HTMLCanvasGenerator();
    var clockWithShapeStrategy = new cc.NoiseDecorator(onlyClock,7);
    var clockWithNoiseStrategy = new cc.NoiseDecorator(onlyClock,10);
    var clockWithNoiseAndShapeStrategy = new cc.NoiseDecorator(clockWithShapeStrategy, 10)
    var clockWithShapeAndNoiseStrategy = new cc.ShapeDecorator(clockWithShapeStrategy, 7)
        
    var ImageGenerator = new cc.ClockImageGenerator(onlyClockStrategy);

    var cc_data = cc.ClockCAPTCHA.generateData(password, ImageGenerator);

    var resPayload = {
        token: jwt.sign({token: cc_data.token}, password, {expiresIn: '30s'}),
        image: cc_data.image
    };

    res.status(200).json(resPayload);
```
In this example we have an implementation of an API (using express) where an application can request data for ``ClockCAPTCHAView.fill()`` function.\
As shown above, there are different options for the ImageGenerationStrategy such that the service is suitable in multiple scenarios , either low or high risk.

##### Validate data received from an app that use view component
```javascript
    //get token and image
    if(ClockCAPTCHA.validateData({token:decoded_token, input: user_input}, password)){
        // CAPTCHA passed
    }else{
        // CAPTCHA failed
    }
```
---
**License**: MIT
**Author** : OutOfBounds.