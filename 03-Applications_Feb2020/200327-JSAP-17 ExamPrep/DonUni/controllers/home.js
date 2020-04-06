import extend from '../utilities/context.js'

export default {
    get: {
        index: async function (context) {
            await extend(context);

            context.partial('../views/home/home.hbs');
        }
    }
}