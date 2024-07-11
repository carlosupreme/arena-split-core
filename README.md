# Arena Split

## Typescript application following Domain Driven Design principles

### Development

To start the project you need to have `Node js` installed in your machine
This comes with `npm` which is the package manager for `Node js`

#### Installation

1. Clone the repo

    ```bash
    git clone git@github.com:carlosupreme/arena-split.git
    ```

2. Navigate to the `arena-split` folder

    ```bash
    cd arena-split
    ```

This app is not a monorepo, so you need to navigate to the `core` folder to work with the core 

And inside `app` folder there will be the various delivery mechanisms for the application each folder inside app should be an independent node application

#### Developing in the Core

When you are developing in the core application you need to move to the `core` folder

```bash
cd core
```

1. Install the dependencies
    ```bash
    npm install
    ```

2. Run the tests
    ```bash
    npm test
    ```

3. Build the application
    ```bash
    npm run build
    ```
   
4. Link the application (if you want to use your changes in a delivery mechanism folder)
    ```bash
    npm link
    ```
   
Now you can develop using Test Driven Development. First write the test and then write the code to make the test pass

When you're done and all the tests are passing you should build the application again (step 3).

### Delivery mechanisms

#### Developing in the API

When you are developing in the API application you need to move to the `app/api-rest` folder

1. Install the dependencies
    ```bash
    npm install
    ```
   
2. Link the core application (if you want to use your changes made in core)
    ```bash
    npm link arena-split-core
    ```

3. Run the tests
    ```bash
    npm test
    ```
   
4. Run the development application
    ```bash
    npm run dev
    ```
   
Now you can develop using Test Driven Development. First write the test and then write the code to make the test pass

The links between the core and the API are made using `npm link` so you need to following these steps to develop in the API using your changes in the Core


If you made changes in the `core` application, and you want to use them in the `API` you need to build the `core` application and then link it again in the `API`

For example:

1. Navigate to the `core` folder
    ```bash
    cd core
    ```
2. Made some changes in your code editor (with Tests of course)
3. Ensure the test are passing and build the core application
    ```bash
    npm test
    npm run build
    ```
4. Now move to the `API` folder
    ```bash
    cd ../app/api-rest
    ```
5. Link the core application again
   ```bash
   npm link arena-split-core
   ```
6. And _voila_, now you can use the changes in the `core` application into the `API` application

### Deployment

To deploy this we have 2 scenarios:

### Deploy the `core` application

Suppose that you only made a core feature (with tests) and you are not responsible for implementing it in the api or whatever. You can deploy the core application to `npm` and then other developers using the core will have your changes.

Just run the following command in the `core`

Obviously the tests should be passing before deploying, so ensure that
```bash
npm run test 
```

Then run the following command to build the application 

```bash
npm run build
```

After that change the `package.json` version to a new version (if you made a new feature you should increment the minor version)

```json
{
  "version": "1.0.1"
}
```

And then publish it to `npm`
```bash
npm publish --tag latest
```

If everything goes well commit your branch and push it to the remote repository
```bash
git add . &&  git commit 'new feature' && git push origin my-new-feature
```

Then open a pull request to the `develop` branch and wait for the approval

### Retrieving the core application new version

If someone publish a new version of the core, a new feature or some bug fix, and if you dont want to pull changes from core and then link the repos
You can check if any version is new by running the following command

```bash
npm outdated
```

If there is a new version you can update the core application by running the following command

```bash
npm update arena-split-core
```

And then you can use the new version of the core application without building it locally

### Deploy a full feature

Suppose that you made a full feature that involves changes in the `core` and in the `API` application.

First do the `Deploy the core application` steps except the pull request.

Also, ensure the tests are passing in the api application.

If you made a full feature merge your changes into `releases` branch and wait for the approval
   
   
