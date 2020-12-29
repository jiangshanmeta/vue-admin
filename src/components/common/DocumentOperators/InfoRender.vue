<template>
    <MetaFieldsLayout
        v-if="!hasInjectComponent || componentsInjected"
        :fields="fields"
        :field-layout-list="fieldLayoutList"
        mode="info"
        v-bind="fieldsLayoutConfig"
    >
        <template #label="{field}">
            <Labels
                :label-name="fields[field].labelName"
                :component="injectedLabelComponents[field]"
                :label="labelMap[field]"
            />
        </template>
        <template #default="{field}">
            <Views
                :view="fields[field].view"
                :record="record"
                :field="field"
                :component="injectedViewComponents[field]"
            />
        </template>
    </MetaFieldsLayout>
</template>

<script>
import injectComponents from '@/components/common/injectHelper/injectComponents';
import {
    getLabelMapByMode,
    getNeedInjectLabelComponentsList,
} from '@/components/common/injectHelper/injectLabelComponentsHelper';
import getNeedInjectViewComponentsMap from '@/components/common/injectHelper/injectViewComponentsHelper';

import _info_prop_mixin from './_info_prop_mixin';

export default {
    name: 'InfoRender',
    components: {
        MetaFieldsLayout: () => import('@/components/common/MetaFieldsLayout'),
        Views: () => import('@/components/common/Views/Views'),
        Labels: () => import('@/components/common/Labels/Labels'),
    },
    mixins: [
        _info_prop_mixin,
    ],
    state: {
        labelMap: {},
        needInjectLabelComponentsList: [],
        needInjectViewComponentsMap: {},
        hasInjectLabelComponents: true,
        hasInjectViewComponents: true,
        get hasInjectComponent () {
            return this.hasInjectLabelComponents || this.hasInjectViewComponents;
        },
    },
    data () {
        return {
            labelComponentsInjected: false,
            viewComponentsInjected: false,
        };
    },
    computed: {
        componentsInjected () {
            return this.labelComponentsInjected && this.viewComponentsInjected;
        },
    },
    watch: {
        fields: {
            handler: 'init',
            immediate: true,
        },
    },
    methods: {
        init () {
            this.labelMap = getLabelMapByMode(this.fields, Object.keys(this.fields), 'info');
            this.needInjectLabelComponentsList = getNeedInjectLabelComponentsList(this.labelMap);
            this.needInjectViewComponentsMap = getNeedInjectViewComponentsMap(this.fields, Object.keys(this.fields));
            this.hasInjectLabelComponents = this.needInjectLabelComponentsList.length > 0;
            this.hasInjectViewComponents = Object.keys(this.needInjectViewComponentsMap).length > 0;

            this.injectLabelComponents();
            this.injectViewComponents();
        },
        injectLabelComponents () {
            this.injectedLabelComponents = {};
            this.labelComponentsInjected = false;
            if (!this.hasInjectLabelComponents) {
                this.labelComponentsInjected = true;
                return;
            }
            injectComponents(this.needInjectLabelComponentsList, this.injectedLabelComponents).then(() => {
                this.labelComponentsInjected = true;
            });
        },
        injectViewComponents () {
            this.injectedViewComponents = {};
            this.viewComponentsInjected = false;
            if (!this.hasInjectViewComponents) {
                this.viewComponentsInjected = true;
                return;
            }
            injectComponents(this.needInjectViewComponentsMap, this.injectedViewComponents).then(() => {
                this.viewComponentsInjected = true;
            });
        },
    },
};
</script>

<style>

</style>
