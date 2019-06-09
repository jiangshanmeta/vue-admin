<template>
    <div>
        <el-button
            v-bind="triggerConfig"
            @click="handleClick"
        >
            {{ triggerConfig.text }}
        </el-button>
        <el-dialog
            v-if="canInitDialog"
            :visible.sync="isShowLightbox"
            v-bind="dialogConfig"
        >
            <MetaTable
                v-if="!hasInjectComponent || componentsInjected"
                :fields="fields"
                :field-layout-list="fieldLayoutList"
                mode="info"
            >
                <template #label="{field}">
                    <Labels
                        :label="fields[field].label"
                    >
                        <component
                            :is="needInjectLabelComponentsMap[field].name"
                            v-if="needInjectLabelComponentsMap[field]"
                            :label="fields[field].label"
                            v-bind="needInjectLabelComponentsMap[field].config || {}"
                        />
                    </Labels>
                </template>
                <template #default="{field}">
                    <Views
                        :view="fields[field].view"
                        :record="record"
                        :field="field"
                    >
                        <template #default="viewScope">
                            <component
                                :is="needInjectViewComponentsMap[field].name"
                                v-if="needInjectViewComponentsMap[field]"
                                v-bind="viewScope"
                            />
                        </template>
                    </Views>
                </template>
            </MetaTable>
        </el-dialog>
    </div>
</template>

<script>
import injectComponents from '@/widget/injectComponents';
import getNeedInjectLabelComponentsMap from '@/injectHelper/injectLabelComponentsHelper';
import getNeedInjectViewComponentsMap from '@/injectHelper/injectViewComponentsHelper';

import {
    logError, 
} from '@/widget/utility.js';

export default {
    name: 'OperatorInfo',
    components: {
        MetaTable: () => import('@/components/common/MetaTable'),
        Views: () => import('@/components/common/Views/Views'),
        Labels: () => import('@/components/common/Labels/Labels'),
    },
    inheritAttrs: true,
    state: {
        injectInited: false,
        needInjectLabelComponentsMap: {},
        needInjectViewComponentsMap: {},
        get hasInjectLabelComponents () {
            return Object.keys(this.needInjectLabelComponentsMap).length > 0;
        },
        get hasInjectViewComponents () {
            return Object.keys(this.needInjectViewComponentsMap).length > 0;
        },
        get hasInjectComponent () {
            return this.hasInjectLabelComponents || this.hasInjectViewComponents;
        },
    },
    props: {
        fields: {
            type: Object,
            required: true,
        },
        getDetailInfo: {
            type: Function,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        dialogConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    data () {
        return {
            labelComponentsInjected: false,
            viewComponentsInjected: false,
            isShowLightbox: false,
            fieldLayoutList: [],
            record: {},
            canInitDialog: false,
        };
    },
    computed: {
        componentsInjected () {
            return this.labelComponentsInjected && this.viewComponentsInjected;
        },
    },
    methods: {
        handleClick () {
            if (!this.injectInited) {
                this.needInjectLabelComponentsMap = getNeedInjectLabelComponentsMap(this.fields, Object.keys(this.fields),'info');
                this.needInjectViewComponentsMap = getNeedInjectViewComponentsMap(this.fields, Object.keys(this.fields));
                this.injectLabelComponents();
                this.injectViewComponents();
                this.injectInited = true;
            }

            new Promise((resolve, reject) => {
                this.getDetailInfo(resolve, this.data);
            }).then(({
                fieldLayoutList, record, 
            }) => {
                this.fieldLayoutList = fieldLayoutList;
                this.record = record;
                this.canInitDialog = true;
                this.isShowLightbox = true;
            }).catch(logError);
        },
        injectLabelComponents () {
            if (!this.hasInjectLabelComponents) {
                return this.labelComponentsInjected = true;
            }
            injectComponents(this, this.needInjectLabelComponentsMap).then(() => {
                this.labelComponentsInjected = true;
            });
        },
        injectViewComponents () {
            if (!this.hasInjectViewComponents) {
                return this.viewComponentsInjected = true;
            }
            injectComponents(this, this.needInjectViewComponentsMap).then(() => {
                this.viewComponentsInjected = true;
            });
        },
    },
};
</script>
