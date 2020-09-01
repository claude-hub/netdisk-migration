# Address book app

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Address book app, where you can search for users addresses and personal information.

# Project architecture and structure

This project is using feature-based architecture. All modules located in the root of the `src` folder should be considered to be `global` or `common` ones.(for example `modals` are `global` because they can be used across the whole project and all features)

The `features` folder includes all project features, and each feature has its own `actions`, `reducers`, `components` etc. that should be used inside of this feature and relate only to this feature.

Another think to have a look at is the `src/store` folder. It includes all `store` related helpers and setups.

# Commits convention

This repo is using [commitizen](https://github.com/commitizen/cz-cli) to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). To be able to commit into this repo, you should run following commands:

```
  npm install -g commitizen
  npm install
```

In order to create a new commit you should type in your console:

```
  git cz
```

You'll be prompted to fill out required commit fields.

> Note: this repo is using `hasky` hooks,
> so you won't be able to push commits which don't follow the conventional commits.

# Installation

Minimum required version of node is `11.15.0`.

In order to run the project, you need to rename the `.env.example` file to `.env` and set you environmental variables.

When your `.env` file is set up, you need to install dependencies with the following commands in your console:

```
  npm i
```

Now to run the project in dev mode, run the following command:

```
  npm run start:dev
```

In order to build the production version, run:

```
  npm run build
```

In order to run the production version, run:

```
  npm start
```

# Linters

This project is using `sass-lint` and `eslint` for linting.

```
  npm run lint
```

# Tests

To run the tests, simply run:

```
  npm test
```
