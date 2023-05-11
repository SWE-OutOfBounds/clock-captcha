# Clock CAPTCHA - V1.0
CAPTCHA service usable in web application to reduce bot spam and other pain.

### FRONT-END ( ``ClockCAPTCHAView()`` )

| Functions                              | Summary                                              | Return  | Examples                                                          |
|----------------------------------------|------------------------------------------------------|---------|-------------------------------------------------------------------|
| constructor()                          | Builds the module and trigger the load animation     | -       | ``captchaModule = new ClockCAPTCHAView()``                        |
| inject(container : HTMLELEMENT)        | Place the module into a HTML container               | boolean | ``catchaModule.inject(document.getElementById('clock-captcha'))`` |
| fill(image_src: string, token: string) | Fill the module with an image and the relative token | void    | ``captchaModule.fill(res.body.image, res.body.token) ``           |
| getToken()                             | Return the token contained in the module             | string  | ``captchaModule.getToken()``                                      |
| getInput()                             | Returns the input field content                      | string  | ``captchaModule.getInput()``                                      |
| error(message: string)                 | Display an error message to the user                 | void    | ``captchaModule.error("Wrong input! Try again.")``                |
| message(msg: string)                   | Display an info message to the user                  | void    | ``captchaModule.message("Please tell the time!")``                |
| clear()                                | Cleans the module content and trigger load animation | void    | ``captchaModule.clear()``                                         |

#### Usage example in ANGULAR enviroment

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

In this example ``_ccService.ccInit()`` calls the back-end to retrive the image content and the relative token.

##### Get captcha result and handle it

```typescript
    
    signup(): void {
    this._ccService.validate(this.captchaModule.getToken(), this.captchaModule.getInput()).subscribe(result =>{
        if(result.okay){
            this._otherService.signup(/*... signup data ...*/, result.token).subscribe(result=>{
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
In this example ``_ccService`` has a function ``validate(token: string, input: string)`` that asks the backend if the user input is a solution of the captcha. If the result is okay, the back end return a onetime token that can be used by ``signup`` function of another dedicated angular service, as ``security pass`` to perform the signup.


**License**: MIT,
**Author** : OutOfBounds.