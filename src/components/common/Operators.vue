<template>
    <div
        v-if="!hasInjectOperatorComponents || componentsInjected"
        ref="container"
        class="operator-container"
    >
        <template v-for="(item,index) in operators">
            <component
                :is="item.name"
                v-if="item.component"
                :key="index"
                :data="data"
                v-bind="mergeAttrsConfig(item.config)"
                @update="notifyUpdate"
            />
            <el-button
                v-else-if="item.handler"
                :key="index"
                v-bind="item.triggerConfig || {}"
                @click="handleOperatorClick(item.handler)"
            >
                {{ (item.triggerConfig && item.triggerConfig.text) || item.label }}
            </el-button>
        </template>
    </div>
</template>

<script>
import mergeAttrsConfig from '@/mixins/common/mergeAttrsConfig.js';
import injectComponents from '@/widget/injectComponents';
import getNeedInjectOperatorComponentsList from '@/injectHelper/injectOperatorComponentsHelper';

import {
    logError, 
} from '@/widget/utility.js';

export default {
    name: 'Operators',
    mixins: [
        mergeAttrsConfig,
    ],
    inheritAttrs: true,
    state: {
        needInjectOperatorComponentsList: [],
        get hasInjectOperatorComponents () {
            return this.needInjectOperatorComponentsList.length > 0;
        },
    },
    props: {
        operators: {
            type: Array,
            default: function () {
                return [];
            },
        },
        data: {
            type: [
                Object, Array,
            ],
            required: true,
        },
    },
    data () {
        return {
            componentsInjected: false,
        };
    },
    created () {
        this.needInjectOperatorComponentsList = getNeedInjectOperatorComponentsList(this.operators);
        this.injectOperatorComponents();
    },
    methods: {
        injectOperatorComponents () {
            if (this.hasInjectOperatorComponents) {
                injectComponents(this.needInjectOperatorComponentsList,this).then(() => {
                    this.componentsInjected = true;
                    this.notifytWidth();
                });
            } else {
                this.notifytWidth();
            }
        },
        handleOperatorClick (func) {
            new Promise((resolve, reject) => {
                func.call(this, resolve, this.data);
            }).then(() => {
                this.notifyUpdate();
            }).catch(logError);
        },
        notifyUpdate () {
            this.$emit('update');
        },
        notifytWidth () {
            this.$nextTick(() => {
                this.$emit('setWidth', this.$refs.container.scrollWidth);
            });
        },
    },
};
</script>

<style scoped>
.operator-container{
    display:table;
    width:max-content;
    white-space:nowrap;
}
.operator-container>*{
    display:inline-block;
    white-space:normal;
}
.operator-container>:first-child~*{
    margin-left:10px;
}
</style>