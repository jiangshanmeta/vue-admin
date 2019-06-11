<template>
    <MetaTable
        v-if="!hasInjectComponent || componentsInjected"
        :fields="fields"
        :mode="mode"
        :field-layout-list="fieldLayoutList"
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
            <component
                :is="fields[field].editorComponent.name"
                :ref="field"
                v-model="localRecord[field]"
                v-bind="generateEditorProp(field)"
            />

            <div
                v-if="fields[field].tip"
                class="form-helper"
            >
                {{ genTip(fields[field].tip) }}
            </div>
            <p
                v-if="validators[field] && validators[field]['hasErr']"
                class="text-danger form-helper"
            >
                {{ validators[field]['errMsg'] }}
            </p>
        </template>
    </MetaTable>
</template>

<script>
import AsyncValidator from 'async-validator';
import Labels from '@/components/common/Labels/Labels';

import injectComponents from '@/widget/injectComponents';
import getNeedInjectLabelComponentsMap from '@/injectHelper/injectLabelComponentsHelper';
import getNeedInjectEditorComponentsList from '@/injectHelper/injectEditorComponentsHelper';

export default {
    name:'Editors',
    components: {
        Labels,
        MetaTable: () => import('@/components/common/MetaTable'),

        EditorString: () => import('./EditorString'),
        EditorText: () => import('./EditorText'),
        EditorPwd: () => import('./EditorPwd'),
        EditorNumber: () => import('./EditorNumber'),
        EditorInt: () => import('./EditorInt'),
        EditorTextrich: () => import('./EditorTextrich'),

        EditorEnumRadio: () => import('./EditorEnumRadio'),
        EditorEnumSelect: () => import('./EditorEnumSelect'),
        EditorEnumAutocomplete: () => import('./EditorEnumAutocomplete'),
        EditorEnumAsyncRadio: () => import('./EditorEnumAsyncRadio'),
        EditorEnumAsyncSelect: () => import('./EditorEnumAsyncSelect'),
        EditorEnumAsyncAutocomplete: () => import('./EditorEnumAsyncAutocomplete'),
        EditorEnumRelatesRadio: () => import('./EditorEnumRelatesRadio'),
        EditorEnumRelatesSelect: () => import('./EditorEnumRelatesSelect'),
        EditorEnumRelatesAutocomplete: () => import('./EditorEnumRelatesAutocomplete'),
        EditorBool: () => import('./EditorBool'),
        EditorGender:()=>import("./EditorGender"),

        EditorArrayCheckbox: () => import('./EditorArrayCheckbox'),
        EditorArrayAutocomplete: () => import('./EditorArrayAutocomplete'),
        EditorArrayAsyncCheckbox: () => import('./EditorArrayAsyncCheckbox'),
        EditorArrayAsyncAutocomplete: () => import('./EditorArrayAsyncAutocomplete'),
        EditorArrayRelatesCheckbox: () => import('./EditorArrayRelatesCheckbox'),
        EditorArrayRelatesAutocomplete: ()=>import("./EditorArrayRelatesAutocomplete"),

        EditorArrayJSONCheckbox: () => import('./EditorArrayJSONCheckbox'),
        EditorArrayJSONAutocomplete: () => import('./EditorArrayJSONAutocomplete'),
        EditorArrayJSONAsyncCheckbox: () => import('./EditorArrayJSONAsyncCheckbox'),
        EditorArrayJSONAsyncAutocomplete: () => import('./EditorArrayJSONAsyncAutocomplete'),
        EditorArrayJSONRelatesCheckbox: () => import('./EditorArrayJSONRelatesCheckbox'),
        EditorArrayJSONRelatesAutocomplete : ()=>import("./EditorArrayJSONRelatesAutocomplete"),

        EditorTimeTs: () => import('./EditorTimeTs'),
        EditorTimeYear: () => import('./EditorTimeYear'),
        EditorTimeMonth: () => import('./EditorTimeMonth'),
        EditorTimeDay: () => import('./EditorTimeDay'),

        FieldFileMono: () => import('./FieldFileMono'),
        FieldFileMonoJson: () => import('./FieldFileMonoJson'),
        FieldFileMulti: () => import('./FieldFileMulti'),
        FieldFileMultiJson: () => import('./FieldFileMultiJson'),
        FieldImageMono: () => import('./FieldImageMono'),
        FieldImageMonoJson: () => import('./FieldImageMonoJson'),
        FieldImageMulti: () => import('./FieldImageMulti'),
        FieldImageMultiJson: () => import('./FieldImageMultiJson'),
    },
    state: {
        needInjectLabelComponentsMap: {},
        get hasInjectLabelComponents () {
            return Object.keys(this.needInjectLabelComponentsMap).length > 0;
        },
        needInjectEditorComponentsList: [],
        get hasInjectEditorComponents () {
            return this.needInjectEditorComponentsList.length;
        },
        get hasInjectComponent () {
            return this.hasInjectLabelComponents || this.hasInjectEditorComponents;
        },
        hasValidateListener: false,
        recordUnwatchs: [],
    },
    props: {
        fieldLayoutList: {
            type: Array,
            required: true,
        },
        record: {
            type: Object,
            required: true,
        },
        fields: {
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
            localRecord: {},
        };
    },
    computed: {
        editFieldsArray () {
            return this.fieldLayoutList.reduce((arr, row) => {
                return row.reduce((arr, field) => {
                    arr.push(field);
                    return arr;
                }, arr);
            }, []);
        },
        formData () {
            return this.editFieldsArray.reduce((obj, field) => {
                obj[field] = this.localRecord[field];
                return obj;
            }, {});
        },
        componentsInjected () {
            return this.labelComponentsInjected && this.editorComponentsInjected;
        },
    },
    watch: {
        record: {
            immediate: true,
            handler () {
                Object.keys(this.validators).forEach((field) => {
                    this.validators[field].unwatch && this.validators[field].unwatch();
                });
                this.localRecord = JSON.parse(JSON.stringify(this.record));
                this.validators = {};
                this.hasValidateListener = false;
                this.initValidate();
            },
        },
        fields: {
            immediate: true,
            handler () {
                this.needInjectLabelComponentsMap = getNeedInjectLabelComponentsMap(this.fields, this.editFieldsArray, this.mode);
                this.needInjectEditorComponentsList = getNeedInjectEditorComponentsList(this.fields, this.editFieldsArray);
                this.labelComponentsInjected = false;
                this.editorComponentsInjected = false;
                this.injectLabelComponents();
                this.injectEditorComponents();
            },
        },
    },
    created () {
        this.$watch(() => {
            return {
                record: this.record,
                fields: this.fields,
            };
        }, this.resetRelates, {
            immediate: true,
        });
    },
    methods: {
        resetRelates () {
            this.recordUnwatchs.forEach((unwatch) => {
                unwatch && unwatch();
            });
            this.recordUnwatchs = [];

            this.editFieldsArray.forEach((field) => {
                const editorComponent = this.fields[field].editorComponent;
                if(!Array.isArray(editorComponent.relates)){
                    return;
                }
                const relates = this.fields[field].editorComponent.relates;

                relates.filter(relateItem => typeof relateItem.handler === 'function').forEach((relateItem) => {
                    const callback = function (newVal, oldVal) {
                        if (this.$refs[field]) {
                            relateItem.handler.call(this.$refs[field], newVal, oldVal, this.fields[field]);
                        } else {
                            setTimeout(() => {
                                callback.call(this, newVal, oldVal);
                            }, 0);
                        }
                    };

                    const unwatch = this.$watch(() => {
                        return this.getRelateData(relateItem);
                    }, callback, relateItem.config);

                    this.recordUnwatchs.push(unwatch);
                });
            });
        },
        generateEditorProp (field) {
            const editorComponent = this.fields[field].editorComponent;
            const relateProps = (editorComponent.relates || []).filter(item => item.propField).reduce((obj, item) => {
                obj[item.propField] = this.getRelateData(item);
                return obj;
            }, Object.create(null));

            const defaultConfig = editorComponent.config || {};
            const modeConfig = editorComponent[`${this.mode}Config`] || {};

            return Object.assign({}, defaultConfig, modeConfig,relateProps);
        },
        getRelateData (relateItem) {
            if (Array.isArray(relateItem.relateField)) {
                return relateItem.relateField.reduce((obj, field) => {
                    obj[field] = this.localRecord[field];
                    return obj;
                }, {});
            } else {
                return this.localRecord[relateItem.relateField];
            }
        },
        injectLabelComponents () {
            if (!this.hasInjectLabelComponents) {
                return this.labelComponentsInjected = true;
            }

            injectComponents(this.needInjectLabelComponentsMap,this).then(() => {
                this.labelComponentsInjected = true;
            });
        },
        injectEditorComponents () {
            if (!this.hasInjectEditorComponents) {
                return this.editorComponentsInjected = true;
            }
            injectComponents(this.needInjectEditorComponentsList,this ).then(() => {
                this.editorComponentsInjected = true;
            });
        },
        initValidate () {
            this.editFieldsArray.forEach((field) => {
                if (!this.fields[field].validator) {
                    return;
                }
                const asyncValidator = new AsyncValidator({
                    [field]: this.fields[field].validator, 
                });

                this.$set(this.validators, field, {
                    hasErr: false,
                    errMsg: '',
                    validator: asyncValidator,
                    unwatch: null,
                });

                if (this.autoValidate) {
                    this.validators[field].unwatch = this.addValidateInputListener(field);
                }
            });

            if (this.autoValidate) {
                this.hasValidateListener = true;
            }
        },
        validate () {
            const keys = Object.keys(this.validators);

            const promises = keys.map((field) => {
                return this.validateField(field, this.formData[field]);
            });

            if (!this.hasValidateListener) {
                keys.forEach((field) => {
                    this.validators[field].unwatch = this.addValidateInputListener(field);
                });
                this.hasValidateListener = true;
            }

            return Promise.all(promises).then(() => {
                return JSON.parse(JSON.stringify(this.formData));
            });
        },
        addValidateInputListener (field) {
            return this.$watch(() => {
                return this.localRecord[field];
            }, (value) => {
                this.validateField(field, value).catch(() => {});
            });
        },
        validateField (field, value) {
            return new Promise((resolve, reject) => {
                const asyncValidator = this.validators[field]['validator'];
                asyncValidator.validate({
                    [field]: value, 
                }, (errors, fields) => {
                    if (errors) {
                        this.validators[field]['hasErr'] = true;
                        this.validators[field]['errMsg'] = errors[0]['message'];
                        reject(errors[0]['message']);
                    } else {
                        this.validators[field]['hasErr'] = false;
                        this.validators[field]['errMsg'] = '';
                        resolve();
                    }
                });
            });
        },
        genTip (tip) {
            if (typeof tip === 'function') {
                tip = tip.call(this);
            }
            return tip;
        },
    },
};
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
