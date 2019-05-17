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
            <editor
                ref="editbox"
                :fields="fields"
                :record="record"
                :field_list="field_list"
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
import _id_mixin from '@/mixins/common/_id_mixin.js'
import { logError, } from '@/widget/utility.js'

export default {
    name: 'Edit',
    components: {
        editor: () => import('@/components/common/editor/editor'),
    },
    mixins: [
        _id_mixin,
    ],
    props: {
        data: {
            type: Object,
            required: true,
        },
        fieldList: {
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
                return {}
            },
        },
        dialogConfig: {
            type: Object,
            default () {
                return {}
            },
        },
        editBtnConfig: {
            type: Object,
            default () {
                return {}
            },
        },
        cancelBtnConfig: {
            type: Object,
            default () {
                return {}
            },
        },
        autoValidate: {
            type: Boolean,
            default: false,
        },
        transformData: {
            type: Function,
            default: function (data) {
                return data
            },
        },
        reserveFields: {
            type: Array,
            default: function () {
                return [
                ]
            },
        },
    },
    data () {
        return {
            isShowEditbox: false,
            fields: [
            ],
            record: {},
            canInitDialog: false,
        }
    },
    methods: {
        getEditFields () {
            new Promise((resolve, reject) => {
                this.getEditInfo(resolve, this.data)
            }).then(({ fields, record, }) => {
                this.fields = fields
                this.record = record
                this.canInitDialog = true
                this.isShowEditbox = true
            }).catch(logError)
        },
        doEdit () {
            this.$refs.editbox.validate().then((data) => {
                this.reserveFields.forEach((field) => {
                    data[field] = this.record[field]
                })

                new Promise((resolve, reject) => {
                    this.doEditRequest(resolve, this.transformData(data))
                }).then(() => {
                    this.isShowEditbox = false
                    this.$emit('update')
                }).catch(logError)
            }).catch((err) => {
                this.$message(err)
            })
        },
    },
}
</script>
