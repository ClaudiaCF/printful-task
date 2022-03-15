# printful-task

## Project structure
* ```/views``` contains the three main different views of the project: Home, Questions and Results.
* ```/components``` contains two custom components needed for the Questions view.
* ```/store``` contains in a single file everything related to Vuex: its state, getters, actions and mutations.
* ```/tests/e2e/specs``` contains 3 different files (one for each view) testing some use cases.

## Project setup

In order to run the project locally first you have to install the dependencies:
```
npm install
```

then you can run it by running the command:
```
npm run serve
```

and in case you want the build you just have to run:
```
npm run build
```

You can also check the project deployed in [Netlify](https://naughty-jepsen-312cbb.netlify.app)

## Tests

I added some e2e tests that you can run by typing this command (you need to have the project running in http://localhost:8080):
```
npm run cy:run
```

## Future improvements

Things that are now out of the scope of the task but I think it would be nice to have:
* ```I18n``` Add as many different json files as languages you want specifying the texts in different languages and access those properties taking into account the locale instead of putting hardcoded text.
* ```Unit testing``` If the logic gets more complicated and we get larger methods it would be nice to add some Jest tests which the project is already prepared for.
* ```Improve error management``` right now routes' accesses are handled in a very simple way that I think it's enough for this task's scope but we could improve routes by using params and add some guards making sure no one can access routes they're not supposed to.

