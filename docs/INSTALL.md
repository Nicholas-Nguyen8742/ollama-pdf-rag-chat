# Installation Guide

Below are detailed steps to install various pre-requisites for local development of this repository's web and server setup.

_**Pre-requisites**_: [Cloning](#clone-repository) | [nvm](#install-nvm) | [pnpm](#install-pnpm)

_**Development**_: [Install Dependencies](#install-dependencies) | [Start Build](#start-building)

____

## Clone Repository

```bash
git clone https://github.com/Nicholas-Nguyen8742/<repository-name>.git

```

```bash
cd <repository-name>
```

## Install nvm

Node Version Manager documentation can be found [here](https://github.com/nvm-sh/nvm) to enable management of multiple node.js versions whether it be for work or for professional development.

1. Install / Update using cURL or Wget:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

1. Run the following command to load nvm.

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

1. Install node@20.9.0 with nvm

```bash
nvm install 20.9.0
```

## Install pnpm

pnpm (performant npm) is a package manager that is a package manager tool that allows you to track all of your dependencies that has multiple package. More information can be found [here](https://pnpm.io/)

1. Install pnpm via npm

> Ensure `nvm use 20.9.0` is run before installing pnpm via npm

```bash
npm i -g pnpm@8.15.6
```

> More installation options for pnpm can be found [here](https://pnpm.io/installation#using-a-standalone-script)

## Install Dependencies

```bash
pnpm install
```

## Start Building

Open 2 terminals and run:

```bash
pnpm start:server

pnpm start:web
```
