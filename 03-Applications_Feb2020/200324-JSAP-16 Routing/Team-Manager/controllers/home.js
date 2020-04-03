import extend from '../utilities/context.js'

export default {
    get: {
        index: async (context) => {
            await extend(context);

            context.partial('../views/home/home.hbs');
        },
        about: async (context) => {
            await extend(context);

            context.partial('../views/about/about.hbs');
        }
    }
}