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
            </MetaTable>
        </el-dialog>
    </div>
</template>

<script>
import injectComponents from '@/components/common/injectHelper/injectComponents';
import {
    getLabelMapByMode,
    getNeedInjectLabelComponentsList,
} from '@/components/common/injectHelper/injectLabelComponentsHelper';
import getNeedInjectViewComponentsMap from '@/components/common/injectHelper/injectViewComponentsHelper';

import {
    logError,
} from '@/widget/utility';

export default {
    name: 'RecordOperatorInfo',
    components: {
        MetaTable: () => import('@/components/common/MetaTable'),
        Views: () => import('@/components/common/Views/Views'),
        Labels: () => import('@/components/common/Labels/Labels'),
    },
    inheritAttrs: true,
    state: {
        injectInited: false,
        labelMap: {},
        needInjectLabelComponentsList: [],
        needInjectViewComponentsMap: {},
        get hasInjectLabelComponents () {
            return this.needInjectLabelComponentsList.length > 0;
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
                this.labelMap = getLabelMapByMode(this.fields, Object.keys(this.fields), 'info');
                this.needInjectLabelComponentsList = getNeedInjectLabelComponentsList(this.labelMap);
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
            this.injectedLabelComponents = {};
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
