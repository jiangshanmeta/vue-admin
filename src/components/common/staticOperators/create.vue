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
            <editor
                ref="createbox"
                :fields="fields"
                :field_list="field_list"
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
import { logError, } from '@/widget/utility'

export default {
    name: 'Create',
    components: {
        editor: () => import('@/components/common/editor/editor'),
    },
    inheritAttrs: true,
    props: {
        fieldList: {
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
                return {}
            },
        },
        dialogConfig: {
            type: Object,
            default () {
                return {}
            },
        },
        createBtnConfig: {
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
        transformData: {
            type: Function,
            default (data) {
                return data
            },
        },
        autoValidate: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            isShowCreatebox: false,
            fields: [
            ],
            record: {},
            canInitDialog: false,
        }
    },
    methods: {
        showDialog () {
            this.isShowCreatebox = true
        },
        resetRecord () {
            this.record = this.fields.reduce((obj, row) => {
                row.forEach((field) => {
                    const configDefault = this.field_list[field].editorComponent.default
                    obj[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault
                })
                return obj
            }, {})
        },
        handleClick () {
            if (this.fields.length === 0) {
                new Promise((resolve, reject) => {
                    this.getCreateFields(resolve)
                }).then((fields) => {
                    this.fields = fields
                    this.resetRecord()
                    this.canInitDialog = true
                    this.showDialog()
                }).catch(logError)
            } else {
                this.resetRecord()
                this.showDialog()
            }
        },
        doCreate () {
            this.$refs.createbox.validate().then((data) => {
                new Promise((resolve) => {
                    this.doCreateRequest(resolve, this.transformData(data))
                }).then(() => {
                    this.isShowCreatebox = false
                    this.$emit('update')
                }).catch(logError)
            }).catch((err) => {
                this.$message(err)
            })
        },
    },
}
</script>
