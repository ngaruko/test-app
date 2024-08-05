
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in playwright. Tests are in `tests/*.test.js`

# Exercise 2:
For too many test cases & flaky tests
- Organise them in folders: (this helps to easily locate tests when a new feature is added or there is a need to refactor or to debug)
  <img width="262" alt="image" src="https://github.com/user-attachments/assets/48ccf68d-5c09-45a0-be5b-9259689e9012">
- Have master configuratation and let other configurations extend that  > at times we need to run the same tests with slihgtly modified configurations (display size for mobile for instance), and instead of writing a whole new configure, we extend a base config
- Use page object models, also organised in folder > Easy to reuse module, easy to refactor/debug in one place
- Use comprehensive reporting > this gives an idea on which test fails and why, often with server or browser or custom logs.
- Save screenshots when a test fails > Help to see what happened, especially if running on CI or headless > maybe a pop up not properly handled, maybe the server is limiting how many logins allowed etc.
- Have utility functions, especially for setup, that can be re-used in many tests, and if possible, which do not use the UI, eg if I want 20 users to test some case, it is more reliable and cheaper to dump those in the db or some API endpoints than add them one by one in the UI.
- Consider some scalable methods to create test data, like mocks or better yet factories which help to create standardised but customisable data across the test code base
- Avoid combining too many features in one test file (like I did)
-  Use `retries` : this can improve results for some intermittently flaky tests
