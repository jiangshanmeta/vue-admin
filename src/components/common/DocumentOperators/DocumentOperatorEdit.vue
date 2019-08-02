<template>
    <div>
        <el-button
            v-bind="triggerConfig"
            @click="getEditFields"
        >
            {{ triggerConfig.text }}
        </el-button>
        <el-dialog
            v-if="canInitDialog"
            :visible.sync="isShowEditbox"
            v-bind="dialogConfig"
        >
            <Editors
                ref="editbox"
                :fields="fields"
                :record="record"
                :editable-fields="editableFields"
                :effect-layout-fields="effectLayoutFields"
                :field-layout="fieldLayout"
                :auto-validate="autoValidate"
                mode="edit"
            />
            <template #footer>
                <el-button
                    v-bind="cancelBtnConfig"
                    @click="isShowEditbox=false"
                >
                    {{ cancelBtnConfig.text }}
                </el-button>
                <el-button
                    v-bind="editBtnConfig"
                    @click="doEdit"
                >
                    {{ editBtnConfig.text }}
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import _id_mixin from '@/mixins/document/_id_mixin';
import {
    logError,
} from '@/widget/utility';

export default {
    name: 'DocumentOperatorEdit',
    components: {
        Editors: () => import('@/components/common/Editors/Editors'),
    },
    mixins: [
        _id_mixin,
    ],
    props: {
        data: {
            type: Object,
            required: true,
        },
        fields: {
            type: Object,
            required: true,
        },
        getEditInfo: {
            type: Function,
            required: true,
        },
        doEditRequest: {
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
        editBtnConfig: {
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
        autoValidate: {
            type: Boolean,
            default: false,
        },
        transformData: {
            type: Function,
            default: function (data) {
                return data;
            },
        },
    },
    state: {
        editableFields: [],
        record: {},
    },
    data () {
        return {
            isShowEditbox: false,
            canInitDialog: false,
        };
    },
    methods: {
        getEditFields () {
            new Promise((resolve, reject) => {
                this.getEditInfo(resolve, this.data);
            }).then(({
                editableFields, record,
            }) => {
                editableFields.forEach((field) => {
                    if (!record.hasOwnProperty(field)) {
                        const configDefault = this.fields[field].editor.default;
                        record[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault;
                    }
                });

                this.editableFields = editableFields;
                this.record = record;
                this.canInitDialog = true;
                this.isShowEditbox = true;
            }).catch(logError);
        },
        doEdit () {
            this.$refs.editbox.validate().then((data) => {
                new Promise((resolve, reject) => {
                    this.doEditRequest(resolve, this.transformData(data));
                }).then(() => {
                    this.isShowEditbox = false;
                    this.$emit('update');
                }).catch(logError);
            }).catch((err) => {
                this.$message(err);
            });
        },
    },
};
</script>
