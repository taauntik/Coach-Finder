<template>
    <coach-filter @change-filter="setFilters"></coach-filter>
    <section>
        <base-card>
            <div class="controls">
                <base-button :mode="'outline'">Refresh</base-button>
                <base-button link to="/register">Register as Coach</base-button>
            </div>
            <ul v-if="hasCoaches">
                <li v-for="coach in filteredCoaches" :key="coach.id">
                    {{ coach.firstName }}
                </li>
                <coach-item
                    v-for="coach in filteredCoaches"
                    :key="coach.id"
                    :first-name="coach.firstName"
                    :last-name="coach.lastName"
                    :areas="coach.areas"
                    :id="coach.id"
                    :rate="coach.hourlyRate">
                </coach-item>
            </ul>
            <h3 v-else>No coaches found!</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            activeFilters : {
                frontend : true,
                backend : true,
                career : true
            }
        }
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        }
    },
    methods: {
        setFilters(updateFilters) {
            this.activeFilters = updateFilters;
        }
    }   
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
