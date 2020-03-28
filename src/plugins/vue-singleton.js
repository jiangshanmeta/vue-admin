export default {
    install (Vue) {
        Vue.prototype.$singleton = function (Component, propsData = {}, dependent) {
            Component = Vue.extend(Component);
            if (!Component.instance) {
                Component.instance = new Component({
                    // 处理store
                    store: this.$store,
                    propsData,
                });

                Component.dependent = [];
                Component.instance.$mount();
                document.body.appendChild(Component.instance.$el);
            } else {
                Object.assign(Component.instance, propsData);
            }

            if (dependent instanceof Vue && !Component.dependent.includes(dependent)) {
                Component.dependent.push(dependent);
                if (!Array.isArray(dependent._relateSingleton)) {
                    dependent._relateSingleton = [];
                }
                if (!dependent._relateSingleton.includes(Component)) {
                    dependent._relateSingleton.push(Component);
                }
            }

            return Component.instance;
        };

        Vue.mixin({
            beforeDestroy () {
                if (!Array.isArray(this._relateSingleton)) {
                    return;
                }
                this._relateSingleton.forEach((Component) => {
                    Component.dependent.splice(Component.dependent.indexOf(this), 1);
                    if (Component.dependent.length === 0) {
                        Component.instance.$destroy();
                        document.body.removeChild(Component.instance.$el);
                        Component.instance = null;
                    }
                });
            },
        });
    },
};
