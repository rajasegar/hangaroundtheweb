---
title: 'Setting up Coveralls for your Ember Addons'
date: Wed, 13 May 2020 17:06:18 +0000
draft: false
tags: ['Articles', 'coverage', 'coveralls', 'ember', 'ember-addon', 'EmberJS']
---

In this tutorial, we will see how to setup automated code coverage metrics collection for your Ember addons using [Coveralls](https://coveralls.io) and [Github Actions](https://github.com/features/actions).

### Why Code coverage?

In simple terms, code coverage is the fraction or percentage of code paths executed by some test or test suite of a program. It is generally measured by a tool which executes the test and logs the lines of code, the test "touches" while running. At its most basic, every conditional statement creates a "branch" defining two unique code paths, and theoretically, both "branches" of each condition must be executed by the test suite in order for the developer to be certain that the code works correctly in each condition.

Code coverage is often used as a metric to determine the effectiveness of Unit tests. Low coverage typically means that developers are not writing adequate unit tests. This signifies that there are many code paths in the application which may possibly behave incorrectly.

### ember-cli-code-coverage

This addon provisions to gather Code coverage for your Ember apps and addons using [Istanbul](https://istanbul.js.org/). Install this addon into your Ember app or addon with \`ember install\`;

```
ember install ember-cli-code-coverage

```

The latest version published on npm is 0.4.2. This might be a very old version and not Octane compatible, you might run into some errors while running the tests. But there is a latest one in Github release with the tag v1.0.0-beta.9. If you are running into any problems with the npm package , you can directly install the 1.x beta version using yarn or npm.

```
npm install --save-dev kategengler/ember-cli-code-coverage#v1.0.0-beta.9

```

Or using yarn

```
yarn add --save-dev kategengler/ember-cli-code-coverage#v1.0.0-beta.9

```

Coverage will only be generated when an environment variable is true (by default COVERAGE) and running your test command like normal.

```
COVERAGE=true ember test

```

### Coveralls

Coveralls is a language-agnostic and CI-agnostic web service to help you track your code coverage over time, and ensure that all your new code is fully covered.

Add your github repo for the app/addon to Coveralls using Add Repos option in the website.

![](/wp-content/uploads/2020/05/coveralls-add-repo.png)

After adding the repo, Coveralls will provide you with a repo token, which we need to identify the repo with Coveralls. You need to add a [Github Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) with the value of this token in your repo. This will be later used in our Github actions to set up the **COVERALLS\_REPO\_TOKEN** environment variable before sending coverage information to Coveralls.

```
env:
  COVERALLS\_REPO\_TOKEN: ${{ secrets.COVERALLS\_REPO\_TOKEN }}

```

Install the coveralls node package.

```
npm install --save-dev coveralls

```

Configure your test script to include coverage information.

```
"scripts": {
   ...
   "test:ember": "COVERAGE=true ember test ",
   ...
 },

```

Add a separate coveralls script to upload the coverage information to Coveralls service.

```
"scripts": {
   ...
   "coveralls": "cat ./coverage/lcov.info | coveralls",
   ...
 },

```

This will upload the coverage statistics generated while running tests in a folder called \`coverage\` in a file known as \`lcov.info\`

### Generating coverage statistics in CI

If you want to generate coverage information and upload it to Coveralls while running your tests in CI whenever you push your code to the repo or whenever a pull request is raised, you can go for some automated CI setup using Travis or Github Actions. In this tutorial we are going to look at how we can achieve this using Github Actions.

### Github actions for Coveralls

This GitHub Action posts your test suite's LCOV coverage data to [coveralls.io](https://coveralls.io) for analysis, change tracking, and notifications. You don't need to add the repo to Coveralls first, it will be created when receiving the post.

When running on pull\_request events, a comment will be added to the PR with details about how coverage will be affected if merged.

Create a new job for your Github Actions or add it part of the existing one.

```
on: \["push", "pull\_request"\]

name: Test Coveralls

jobs:

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:

    - uses: actions/checkout@v1

    - name: Use Node.js 10.x
      uses: actions/setup-node@v1
      with:
        node-version: 10.x

    - name: npm install, run coveralls
      env:
        COVERALLS\_REPO\_TOKEN: ${{ secrets.COVERALLS\_REPO\_TOKEN }}
      run: |
        npm install
        npm test:ember
        npm run coveralls

    - name: Coveralls
      uses: coverallsapp/github-action@master
      with:
        github-token: ${{ secrets.GITHUB\_TOKEN }}

```

If you want to see the above setup in action, please take a look at my [ember-chance](https://github.com/rajasegar/ember-chance) addon repo.

### Optional Goodies: README Badge

And finally if you want to add the coverage statistics as a badge in your README, you can do so by adding the following snippet at the top of your README file, which will show how much the coverge % is for your addon.

```
\[!\[Coverage Status\](https://coveralls.io/repos/github/<github-user-name>/<repo-name>/badge.svg?branch=master)\](https://coveralls.io/github/<github-user-name>/<repo-name>?branch=master)

```

Please ensure to replace the above snippet with the appropriate values for the placeholders like <github-user-name> and <repo-name>

### Recap

1.  Install ember-cli-code-coverage
2.  Install coveralls from npm
3.  Modify the test script in package.json to include COVERAGE=true
4.  Add a new script for coveralls to upload the coverage info
5.  Add your repo to Coveralls.io and get the repo\_token  
    
6.  Add a Github secret with the value of the repo\_token in the repository
7.  Setup automated coverage collection in CI using Coveralls Github Actions

### References:

*   [ember-cli-code-coverage](https://github.com/kategengler/ember-cli-code-coverage)
*   [Coveralls](https://coveralls.io)
*   [Coveralls Github Action](https://github.com/coverallsapp/github-action/)
