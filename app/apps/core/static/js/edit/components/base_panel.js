const BasePanel = Vue.extend({
    props: ['part'],
    data() {
        return {
            ratio: 1
        };
    },
    updated() {
        if (this.part.loaded) this.refresh();
    },
    methods: {
        setRatio() {
            this.ratio = this.$el.firstChild.clientWidth / this.part.image.size[0];
        },
        refresh() {
            this.setRatio();
            this.updateView();
        },
        updateView() {}
    }
});
