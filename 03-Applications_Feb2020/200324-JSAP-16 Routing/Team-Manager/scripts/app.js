import controllers from '../controllers/controllers.js'

Sammy('#main', function () {
    this.use('Handlebars', 'hbs');
    
    this.get('#/', controllers.home.get.index);
    this.get('#/home', controllers.home.get.index);
    this.get('#/about', controllers.home.get.about);

    //User functionality
    this.get('#/login', controllers.user.get.login);
    this.post('#/login', controllers.user.post.login);

    this.get('#/register', controllers.user.get.register);
    this.post('#/register', controllers.user.post.register);

    this.get('#/logout', controllers.user.get.logout);

    //Team functionality
    this.get('#/catalog', controllers.team.get.catalog);
    this.get('#/create', controllers.team.get.create);
    this.post('#/create', controllers.team.post.create);

    this.get('#/catalog/:id', controllers.team.get.team);
    this.get('#/join/:id', controllers.team.get.join);
    this.get('#/edit/:id', controllers.team.get.edit);
    this.post('#/edit/:id', controllers.team.post.edit);
    this.get('#/leave', controllers.team.get.leave);


}).run('#/home');