<template>
    <meta-table
        v-if="!hasInjectComponent || componentsInjected"
        :field_list="field_list"
        :mode="mode"
        :fields="fields"
    >
        <template #label="{field}">
            <labels
                :label="field_list[field].label"
            >
                <component
                    :is="needInjectLabelComponentsMap[field].name"
                    v-if="needInjectLabelComponentsMap[field]"
                    :label="field_list[field].label"
                    v-bind="needInjectLabelComponentsMap[field].config || {}"
                />
            </labels>
        </template>

        <template #default="{field}">
            <component
                :is="field_list[field].editorComponent.name"
                :ref="field"
                v-model="localRecord[field]"
                v-bind="generateEditorProp(field)"
            />

            <div
                v-if="field_list[field].tip"
                class="form-helper"
            >
                {{ genTip(field_list[field].tip) }}
            </div>
            <p
                v-if="validators[field] && validators[field]['hasErr']"
                class="text-danger form-helper"
            >
                {{ validators[field]['errMsg'] }}
            </p>
        </template>
    </meta-table>
</template>

<script>
import AsyncValidator from 'async-validator'
import labels from '@/components/common/labels/labels'

import injectComponents from '@/widget/injectComponents'
import getNeedInjectLabelComponentsMap from '@/injectHelper/injectLabelComponentsHelper'
import getNeedInjectEditorComponentsList from '@/injectHelper/injectEditorComponentsHelper'

export default {
    components: {
        labels,
        metaTable: () => import('@/components/common/meta-table'),

        editor_string: () => import('./editor_string'),
        editor_text: () => import('./editor_text'),
        editor_pwd: () => import('./editor_pwd'),
        editor_number: () => import('./editor_number'),
        editor_int: () => import('./editor_int'),
        editor_textrich: () => import('./editor_textrich'),

        editor_enum_radio: () => import('./editor_enum_radio'),
        editor_enum_radio_async: () => import('./editor_enum_radio_async'),
        editor_enum_radio_relates: () => import('./editor_enum_radio_relates'),
        editor_enum_select: () => import('./editor_enum_select'),
        editor_enum_select_async: () => import('./editor_enum_select_async'),
        editor_enum_select_relates: () => import('./editor_enum_select_relates'),
        editor_enum_autocomplete: () => import('./editor_enum_autocomplete'),
        editor_enum_autocomplete_async: () => import('./editor_enum_autocomplete_async'),
        editor_enum_autocomplete_relates: () => import('./editor_enum_autocomplete_relates'),
        editor_bool: () => import('./editor_bool'),
        editor_gender: () => import('./editor_gender'),

        editor_array_checkbox: () => import('./editor_array_checkbox'),
        editor_array_checkbox_json: () => import('./editor_array_checkbox_json'),
        editor_array_checkbox_async: () => import('./editor_array_checkbox_async'),
        editor_array_checkbox_async_json: () => import('./editor_array_checkbox_async_json'),
        editor_array_checkbox_relates: () => import('./editor_array_checkbox_relates'),
        editor_array_checkbox_relates_json: () => import('./editor_array_checkbox_relates_json'),
        editor_array_autocomplete: () => import('./editor_array_autocomplete'),
        editor_array_autocomplete_json: () => import('./editor_array_autocomplete_json'),
        editor_array_autocomplete_async: () => import('./editor_array_autocomplete_async'),
        editor_array_autocomplete_async_json: () => import('./editor_array_autocomplete_async_json'),
        editor_array_checkbox_relates: () => import('./editor_array_checkbox_relates'),
        editor_array_checkbox_json: () => import('./editor_array_checkbox_json'),

        editor_time_ts: () => import('./editor_time_ts'),
        editor_time_year: () => import('./editor_time_year'),
        editor_time_month: () => import('./editor_time_month'),
        editor_time_day: () => import('./editor_time_day'),

        field_file_mono: () => import('./field_file_mono'),
        field_file_mono_json: () => import('./field_file_mono_json'),
        field_file_multi: () => import('./field_file_multi'),
        field_file_multi_json: () => import('./field_file_multi_json'),
        field_image_mono: () => import('./field_image_mono'),
        field_image_mono_json: () => import('./field_image_mono_json'),
        field_image_multi: () => import('./field_image_multi'),
        field_image_multi_json: () => import('./field_image_multi_json'),
    },
    state: {
        needInjectLabelComponentsMap: {},
        get hasInjectLabelComponents () {
            return Object.keys(this.needInjectLabelComponentsMap).length > 0
        },
        needInjectEditorComponentsList: [
        ],
        get hasInjectEditorComponents () {
            return this.needInjectEditorComponentsList.length
        },
        get hasInjectComponent () {
            return this.hasInjectLabelComponents || this.hasInjectEditorComponents
        },
        hasValidateListener: false,
    },
    props: {
        fields: {
            type: Array,
            required: true,
        },
        record: {
            type: Object,
            required: true,
        },
        fieldList: {
            type: Object,
            required: true,
        },
        autoValidate: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            labelComponentsInjected: false,
            editorComponentsInjected: false,
            validators: {},
            recordUnwatchs: [
            ],
            localRecord: {},
        }
    },
    computed: {
        editFieldsArray () {
            return this.fields.reduce((arr, row) => {
                return row.reduce((arr, field) => {
                    arr.push(field)
                    return arr
                }, arr)
            }, [
            ])
        },
        formData () {
            return this.editFieldsArray.reduce((obj, field) => {
                obj[field] = this.localRecord[field]
                return obj
            }, {})
        },
        componentsInjected () {
            return this.labelComponentsInjected && this.editorComponentsInjected
        },
    },
    watch: {
        record: {
            immediate: true,
            handler () {
                Object.keys(this.validators).forEach((field) => {
                    this.validators[field].unwatch && this.validators[field].unwatch()
                })
                this.localRecord = JSON.parse(JSON.stringify(this.record))
                this.validators = {}
                this.hasValidateListener = false
                this.initValidate()
            },
        },
        fields: {
            immediate: true,
            handler () {
                this.needInjectLabelComponentsMap = getNeedInjectLabelComponentsMap(this.field_list, this.editFieldsArray, this.mode)
                this.needInjectEditorComponentsList = getNeedInjectEditorComponentsList(this.field_list, this.editFieldsArray)
                this.labelComponentsInjected = false
                this.editorComponentsInjected = false
                this.injectLabelComponents()
                this.injectEditorComponents()
            },
        },
    },
    created () {
        this.$watch(() => {
            return {
                record: this.record,
                fields: this.fields,
            }
        }, this.resetRelates, {
            immediate: true,
        })
    },
    methods: {
        getRelateData (relateItem) {
            if (Array.isArray(relateItem.relateField)) {
                return relateItem.relateField.reduce((obj, field) => {
                    obj[field] = this.localRecord[field]
                    return obj
                }, {})
            } else {
                return this.localRecord[relateItem.relateField]
            }
        },
        generateEditorProp (field) {
            const editorComponent = this.field_list[field].editorComponent
            const defaultConfig = editorComponent.config || {}
            const modeConfig = editorComponent[`${this.mode}Config`] || {}
            const config = Object.assign({}, defaultConfig, modeConfig)
            const {
                relates = [
                ],
            } = config
            const relateProps = relates.filter(item => item.propField).reduce((obj, item) => {
                obj[item.propField] = this.getRelateData(item)
                return obj
            }, Object.create(null))

            return Object.assign({}, config, relateProps)
        },
        injectLabelComponents () {
            if (!this.hasInjectLabelComponents) {
                return this.labelComponentsInjected = true
            }

            injectComponents(this, this.needInjectLabelComponentsMap).then(() => {
                this.labelComponentsInjected = true
            })
        },
        injectEditorComponents () {
            if (!this.hasInjectEditorComponents) {
                return this.editorComponentsInjected = true
            }
            injectComponents(this, this.needInjectEditorComponentsList).then(() => {
                this.editorComponentsInjected = true
            })
        },
        validate () {
            const keys = Object.keys(this.validators)

            const promises = keys.map((field) => {
                return this.validateField(field, this.formData[field])
            })

            if (!this.hasValidateListener) {
                keys.forEach((field) => {
                    this.validators[field].unwatch = this.addValidateInputListener(field)
                })
                this.hasValidateListener = true
            }

            return Promise.all(promises).then(() => {
                return JSON.parse(JSON.stringify(this.formData))
            })
        },
        validateField (field, value) {
            return new Promise((resolve, reject) => {
                const asyncValidator = this.validators[field]['validator']
                asyncValidator.validate({ [field]: value, }, (errors, fields) => {
                    if (errors) {
                        this.validators[field]['hasErr'] = true
                        this.validators[field]['errMsg'] = errors[0]['message']
                        reject(errors[0]['message'])
                    } else {
                        this.validators[field]['hasErr'] = false
                        this.validators[field]['errMsg'] = ''
                        resolve()
                    }
                })
            })
        },
        addValidateInputListener (field) {
            return this.$watch(() => {
                return this.localRecord[field]
            }, (value) => {
                this.validateField(field, value).catch(() => {})
            })
        },
        resetRelates () {
            this.recordUnwatchs.forEach((unwatch) => {
                unwatch && unwatch()
            })
            this.recordUnwatchs = [
            ]

            this.editFieldsArray.forEach((field) => {
                const editorComponent = this.field_list[field].editorComponent
                if (!editorComponent || !editorComponent.config || !editorComponent.config.relates) {
                    return
                }
                const relates = this.field_list[field].editorComponent.config.relates

                relates.filter(relateItem => typeof relateItem.handler === 'function').forEach((relateItem) => {
                    const callback = function (newVal, oldVal) {
                        if (this.$refs[field]) {
                            relateItem.handler.call(this.$refs[field], newVal, this.field_list[field], oldVal)
                        } else {
                            setTimeout(() => {
                                callback.call(this, newVal, oldVal)
                            }, 0)
                        }
                    }

                    const unwatch = this.$watch(() => {
                        return this.getRelateData(relateItem)
                    }, callback, relateItem.config)

                    this.recordUnwatchs.push(unwatch)
                })
            })
        },
        initValidate () {
            this.editFieldsArray.forEach((field) => {
                if (!this.field_list[field].validator) {
                    return
                }
                const asyncValidator = new AsyncValidator({ [field]: this.field_list[field].validator, })

                this.$set(this.validators, field, {
                    hasErr: false,
                    errMsg: '',
                    validator: asyncValidator,
                    unwatch: null,
                })

                if (this.autoValidate) {
                    this.validators[field].unwatch = this.addValidateInputListener(field)
                }
            })

            if (this.autoValidate) {
                this.hasValidateListener = true
            }
        },
        genTip (tip) {
            if (typeof tip === 'function') {
                tip = tip.call(this)
            }
            return tip
        },
    },
}
</script>

<style scoped>
.form-helper{
    margin-top:5px;
    margin-bottom:5px;
    color:#737373;
    font-size:12px;
    line-height:1.42;
}
.text-danger{
    color:#FF4949;
}
</style>
