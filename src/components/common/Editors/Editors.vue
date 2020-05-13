<template>
    <MetaTable
        v-if="!hasInjectComponent || componentsInjected"
        :fields="fields"
        :mode="mode"
        :field-layout-list="fieldLayoutList"
    >
        <template #label="{field}">
            <Labels
                :label-name="fields[field].labelName"
                :component="injectedLabelComponents[field]"
                :label="labelMap[field]"
            />
        </template>

        <template #default="{field}">
            <component
                :is="fields[field].editor.name"
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

import injectComponents from '@/components/common/injectHelper/injectComponents';
import {
    getLabelMapByMode,
    getNeedInjectLabelComponentsList,
} from '@/components/common/injectHelper/injectLabelComponentsHelper';
import getNeedInjectEditorComponentsList from '@/components/common/injectHelper/injectEditorComponentsHelper';

import _editor_form_prop_mixin from './_editor_form_prop_mixin';

AsyncValidator.warning = function () {};
const validatorOption = {
    first: true,
};

export default {
    name: 'Editors',
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
        EditorGender: () => import('./EditorGender'),

        EditorArrayCheckbox: () => import('./EditorArrayCheckbox'),
        EditorArrayAutocomplete: () => import('./EditorArrayAutocomplete'),
        EditorArrayAsyncCheckbox: () => import('./EditorArrayAsyncCheckbox'),
        EditorArrayAsyncAutocomplete: () => import('./EditorArrayAsyncAutocomplete'),
        EditorArrayRelatesCheckbox: () => import('./EditorArrayRelatesCheckbox'),
        EditorArrayRelatesAutocomplete: () => import('./EditorArrayRelatesAutocomplete'),

        EditorArrayJSONCheckbox: () => import('./EditorArrayJSONCheckbox'),
        EditorArrayJSONAutocomplete: () => import('./EditorArrayJSONAutocomplete'),
        EditorArrayJSONAsyncCheckbox: () => import('./EditorArrayJSONAsyncCheckbox'),
        EditorArrayJSONAsyncAutocomplete: () => import('./EditorArrayJSONAsyncAutocomplete'),
        EditorArrayJSONRelatesCheckbox: () => import('./EditorArrayJSONRelatesCheckbox'),
        EditorArrayJSONRelatesAutocomplete: () => import('./EditorArrayJSONRelatesAutocomplete'),

        EditorFile: () => import('./EditorFile'),
        EditorArrayFile: () => import('./EditorArrayFile'),
        EditorArrayJSONFile: () => import('./EditorArrayJSONFile'),
        EditorImage: () => import('./EditorImage'),
        EditorArrayImage: () => import('./EditorArrayImage'),
        EditorArrayJSONImage: () => import('./EditorArrayJSONImage'),
    },
    mixins: [
        _editor_form_prop_mixin,
    ],
    state: {
        labelMap: {},
        needInjectLabelComponentsList: [],
        hasInjectLabelComponents: false,
        needInjectEditorComponentsList: [],
        hasInjectEditorComponents: false,
        get hasInjectComponent () {
            return this.hasInjectLabelComponents || this.hasInjectEditorComponents;
        },
        hasValidateListener: false,
        recordUnwatchs: [],
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
        componentsInjected () {
            return this.labelComponentsInjected && this.editorComponentsInjected;
        },
        fieldLayoutList () {
            if (Array.isArray(this.fieldLayout)) {
                return this.fieldLayout;
            } else {
                const effectLayoutData = this.effectLayoutFields.reduce((obj, field) => {
                    obj[field] = this.localRecord[field];
                    return obj;
                }, Object.create(null));
                return this.fieldLayout(effectLayoutData);
            }
        },
        curEditableFields () {
            return this.fieldLayoutList.reduce((obj, row) => {
                row.forEach((field) => {
                    obj[field] = true;
                });
                return obj;
            }, Object.create(null));
        },
    },
    watch: {
        record: {
            immediate: true,
            handler () {
                this.localRecord = JSON.parse(JSON.stringify(this.record));
                this.resetValidate();
                this.resetRelates();
            },
        },
    },
    created () {
        this.$watch(() => {
            return {
                fields: this.fields,
                editableFields: this.editableFields,
                mode: this.mode,
            };
        }, this.init, {
            immediate: true,
        });
    },
    methods: {
        init () {
            this.labelMap = getLabelMapByMode(this.fields, this.editableFields, this.mode);
            this.needInjectLabelComponentsList = getNeedInjectLabelComponentsList(this.labelMap);
            this.needInjectEditorComponentsList = getNeedInjectEditorComponentsList(this.fields, this.editableFields);
            this.hasInjectLabelComponents = this.needInjectLabelComponentsList.length > 0;
            this.hasInjectEditorComponents = this.needInjectEditorComponentsList.length > 0;
            this.injectLabelComponents();
            this.injectEditorComponents();
        },
        resetRelates () {
            this.recordUnwatchs.forEach((unwatch) => {
                unwatch && unwatch();
            });
            this.recordUnwatchs = [];
            this.recordUnwatchs.push(...this.recordWatch(this.localRecord));

            this.editableFields.forEach((field) => {
                const editor = this.fields[field].editor;
                if (!Array.isArray(editor.relates)) {
                    return;
                }
                const relates = this.fields[field].editor.relates;

                relates.filter(relateItem => typeof relateItem.handler === 'function').forEach((relateItem) => {
                    const callback = function (newVal, oldVal) {
                        if (!this.curEditableFields[field]) {
                            return;
                        }

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
                    }, callback, {
                        ...relateItem.config,
                    });

                    this.recordUnwatchs.push(unwatch);
                });
            });
        },
        generateEditorProp (field) {
            const editor = this.fields[field].editor;
            const relateProps = (editor.relates || []).filter(item => item.propField).reduce((obj, item) => {
                obj[item.propField] = this.getRelateData(item);
                return obj;
            }, Object.create(null));

            const defaultConfig = editor.config || {};
            const modeConfig = editor[`${this.mode}Config`] || {};

            return Object.assign({}, defaultConfig, modeConfig, relateProps);
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
            this.injectedLabelComponents = {};
            if (!this.hasInjectLabelComponents) {
                this.labelComponentsInjected = true;
                return;
            }

            injectComponents(this.needInjectLabelComponentsList, this.injectedLabelComponents).then(() => {
                this.labelComponentsInjected = true;
            });
        },
        injectEditorComponents () {
            if (!this.hasInjectEditorComponents) {
                this.editorComponentsInjected = true;
                return;
            }
            injectComponents(this.needInjectEditorComponentsList, this).then(() => {
                this.editorComponentsInjected = true;
            });
        },
        resetValidate () {
            Object.keys(this.validators).forEach((field) => {
                this.validators[field].unwatch && this.validators[field].unwatch();
            });
            this.validators = {};
            this.hasValidateListener = false;

            this.editableFields.forEach((field) => {
                const validator = this.fields[field].validator;
                if (!validator) {
                    return;
                }
                let autoValidate = this.autoValidate;
                const autoValidateConfig = this.fields[field].autoValidate;
                if (autoValidateConfig !== undefined) {
                    if (typeof autoValidateConfig === 'function') {
                        autoValidate = autoValidateConfig(this.mode);
                    } else {
                        autoValidate = !!autoValidateConfig;
                    }
                }

                const asyncValidator = new AsyncValidator({
                    [field]: typeof validator === 'function' ? validator.call(this, this.localRecord, this.mode) : validator,
                });

                this.$set(this.validators, field, {
                    hasErr: false,
                    errMsg: '',
                    validator: asyncValidator,
                    unwatch: null,
                });

                if (autoValidate) {
                    this.validators[field].unwatch = this.addValidateInputListener(field);
                }
            });
        },
        validate () {
            const keys = Object.keys(this.validators);

            const promises = keys.map((field) => {
                return this.validateField(field, this.localRecord[field]);
            });

            if (!this.hasValidateListener) {
                keys.forEach((field) => {
                    if (!this.validators[field].unwatch) {
                        this.validators[field].unwatch = this.addValidateInputListener(field);
                    }
                });
                this.hasValidateListener = true;
            }

            return Promise.all(promises).then(() => {
                return JSON.parse(JSON.stringify(this.localRecord));
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
                const asyncValidator = this.validators[field].validator;
                asyncValidator.validate({
                    [field]: value,
                },
                validatorOption,
                (errors, fields) => {
                    if (errors) {
                        this.validators[field].hasErr = true;
                        this.validators[field].errMsg = errors[0].message;
                        reject(errors[0].message);
                    } else {
                        this.validators[field].hasErr = false;
                        this.validators[field].errMsg = '';
                        resolve();
                    }
                });
            });
        },
        genTip (tip) {
            if (typeof tip === 'function') {
                tip = tip.call(this, this.mode);
            }
            return tip;
        },
    },
};
</script>

<style scoped>
.form-helper {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #737373;
    font-size: 12px;
    line-height: 1.42;
}

.text-danger {
    color: #ff4949;
}
</style>
