import firestore from '../utilities/firestoreRepository.js'
import extend from '../utilities/context.js'
import userManager from '../utilities/userManager.js'

const firestoreRepo = firestore('causes');
const um = userManager();

export default {
    get: {
        dashboard: async function (context) {
            await extend(context);
            let causes = (await firestoreRepo.getAll()).map(c => {
                return { id: c.id, ...c.data() }
            });

            context.hasCauses = !!causes.length;
            context.causes = causes;

            context.partial('../views/cause/all.hbs');
        },
        create: async function (context) {
            await extend(context);

            context.partial('../views/cause/create.hbs');
        },
        details: async function (context) {
            await extend(context);
            let {id} = context.params;

            let response = await firestoreRepo.getById(id);
            let cause = {
                id,
                ...response.data()
            }

            let currentUserId = um.getCurrentUser().uid;

            context.isCreator = currentUserId === cause.creatorId;

            Object.keys(cause).forEach(prop => {
                context[prop] = cause[prop];
            });

            context.partial('../views/cause/details.hbs');
        },
        delete: async function (context){
            let {id} = context.params;
            await firestoreRepo.remove(id);

            await extend(context);

            context.redirect('#/dashboard');
        }
    },
    post: {
        create: function (context) {
            let { cause, pictureUrl, neededFunds, description } = context.params;

            let causeObj = {
                cause,
                pictureUrl,
                neededFunds,
                description,
                donors: [],
                collectedFunds: 0,
                creatorId: um.getCurrentUser().uid
            }

            extend(context)
                .then(() => {
                    return firestoreRepo.add(causeObj)
                })
                .then(causeId => {
                    context.redirect(`#/details/${causeId}`);
                });
        }
    },
    put: {
        edit: function (context) {
            let {id, currentDonation} = context.params;
            
            let currentUserUsername = um.getCurrentUser().email;
            
            firestoreRepo.getById(id)
            .then(res => {
                let cause = {...res.data()};
                cause.collectedFunds += Number(currentDonation);
                if(!cause.donors.some(d => d === currentUserUsername)){
                    cause.donors.push(currentUserUsername);
                }
                firestoreRepo.update(id, cause)
                .then(asd => {
                    console.log(asd);
                    extend(context);
                })
                .then(() => {
                    context.redirect(`#/details/${id}`);
                });
            })
        }
    }
}