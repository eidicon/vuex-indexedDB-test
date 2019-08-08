import Vue from 'vue';
import Demo from './components/demo/Demo.vue';
import store from './store';

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <Demo />
    </div>`,
    components: {
        Demo,
    }, store
});