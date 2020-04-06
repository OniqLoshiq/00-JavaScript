import controllers from '../controllers/controllers.js'

Sammy('#main', function () {
    this.use('Handlebars', 'hbs');
    
    this.get('#/', controllers.home.get.index);
    this.get('#/home', controllers.home.get.index);

    //User functionality
    this.get('#/login', controllers.user.get.login);
    this.post('#/login', controllers.user.post.login);

    this.get('#/register', controllers.user.get.register);
    this.post('#/register', controllers.user.post.register);

    this.get('#/logout', controllers.user.get.logout);

    //Entity functionality
    this.get('#/dashboard', controllers.cause.get.dashboard);

    this.get('#/create', controllers.cause.get.create);
    this.post('#/create', controllers.cause.post.create);

    this.get('#/details/:id', controllers.cause.get.details);

    this.post('#/edit/:id', controllers.cause.put.edit);

    this.get('#/delete/:id', controllers.cause.get.delete)
}).run('#/home');