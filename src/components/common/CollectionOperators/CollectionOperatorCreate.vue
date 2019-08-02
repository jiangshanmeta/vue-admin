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
            :visible.sync="isShowCreatebox"
            v-bind="dialogConfig"
        >
            <Editors
                ref="createbox"
                :fields="fields"
                :editable-fields="editableFields"
                :field-layout="fieldLayout"
                :effect-layout-fields="effectLayoutFields"
                :record="record"
                :auto-validate="autoValidate"
                mode="create"
            />
            <template #footer>
                <el-button
                    v-bind="cancelBtnConfig"
                    @click="isShowCreatebox=false"
                >
                    {{ cancelBtnConfig.text }}
                </el-button>
                <el-button
                    v-bind="createBtnConfig"
                    @click="doCreate"
                >
                    {{ createBtnConfig.text }}
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    logError,
} from '@/widget/utility';

export default {
    name: 'CollectionOperatorCreate',
    components: {
        Editors: () => import('@/components/common/Editors/Editors'),
    },
    inheritAttrs: true,
    props: {
        fields: {
            type: Object,
            required: true,
        },
        getCreateFields: {
            type: Function,
            required: true,
        },
        doCreateRequest: {
            type: Function,
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
        fieldLayout: {
            type: [
                Function, Array,
            ],
            required: true,
        },
        effectLayoutFields: {
            type: Array,
            default () {
                return [];
            },
        },
        createBtnConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        cancelBtnConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        transformData: {
            type: Function,
            default (data) {
                return data;
            },
        },
        autoValidate: {
            type: Boolean,
            default: false,
        },
    },
    state: {
        editableFields: [],
        record: {},
    },
    data () {
        return {
            isShowCreatebox: false,
            canInitDialog: false,
        };
    },
    methods: {
        showDialog () {
            this.isShowCreatebox = true;
        },
        resetRecord () {
            this.record = this.editableFields.reduce((obj, field) => {
                const configDefault = this.fields[field].editor.default;
                obj[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault;
                return obj;
            }, {});
        },
        handleClick () {
            if (this.editableFields.length === 0) {
                new Promise((resolve, reject) => {
                    this.getCreateFields(resolve);
                }).then((editableFields) => {
                    this.editableFields = editableFields;
                    this.resetRecord();
                    this.canInitDialog = true;
                    this.showDialog();
                }).catch(logError);
            } else {
                this.resetRecord();
                this.showDialog();
            }
        },
        doCreate () {
            this.$refs.createbox.validate().then((data) => {
                new Promise((resolve) => {
                    this.doCreateRequest(resolve, this.transformData(data));
                }).then(() => {
                    this.isShowCreatebox = false;
                    this.$emit('update');
                }).catch(logError);
            }).catch((err) => {
                this.$message(err);
            });
        },
    },
};
</script>
