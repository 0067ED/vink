import vink from './index.vue';
import { Vue } from 'vue/types/vue';

(vink as any).install = function (VueClass: typeof Vue) {
    VueClass.component('v-ink', vink);
};

export default vink;