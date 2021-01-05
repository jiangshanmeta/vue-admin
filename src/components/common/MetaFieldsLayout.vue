<template>
    <component
        :is="layoutComponentName"
        v-bind="$attrs"
        v-if="!hasInjectComponent || componentsInjected"
    >
        <template
            #label="scope"
        >
            <slot
                name="label"
                v-bind="scope"
            />
        </template>
        <template #default="scope">
            <slot v-bind="scope" />
        </template>
    </component>
</template>

<script>
import injectComponents from '@/components/common/injectHelper/injectComponents';
import MetaTable from '@/components/common/FieldsLayout/MetaTable';

export default {
    name: 'MetaFieldsLayout',
    components: {
        MetaTable,
    },
    props: {
        layoutComponentName: {
            type: String,
            default: 'MetaTable',
        },
        layoutComponent: {
            type: [
                Function,
                Object,
            ],
            default: null,
        },
    },
    data () {
        return {
            hasInjectComponent: false,
            componentsInjected: false,
        };
    },
    watch: {
        layoutComponent: {
            handler () {
                if (!this.layoutComponent) {
                    this.hasInjectComponent = false;
                    return;
                }

                this.hasInjectComponent = true;
                this.componentsInjected = false;
                injectComponents([
                    {
                        name: this.layoutComponentName,
                        component: this.layoutComponent,
                    },
                ], this).then(() => {
                    this.componentsInjected = true;
                });
            },
            immediate: true,
        },
    },
};
</script>
