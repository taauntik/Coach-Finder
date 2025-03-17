import { createStore } from 'vuex';
import coachesModule from './modules/coaches';

const store = createStore({
    modules : {
        // Import the module here
        coaches : coachesModule
    }
});

export default store;