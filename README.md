# AngularN5xtemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To install git in docker env:

replace deb.debian.org with archive.debian.org:
sudo sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list

replace security.debian.org with archive.debian.org/debian-security/:
sudo sed -i 's|security.debian.org|archive.debian.org|g' /etc/apt/sources.list 

remove line that contains source stretch-updates:
sudo sed -i '/stretch-updates/d' /etc/apt/sources.list

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
