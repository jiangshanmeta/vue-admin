<template>
    <div>
        <el-button @click="back">
            返回
        </el-button>

        <InfoRender
            v-if="record"
            :record="record"
            :field-layout-list="fieldLayoutList"
            v-bind="$attrs"
        />
    </div>
</template>

<script>
import InfoRender from '@/components/common/DocumentOperators/InfoRender';

import {
    logError,
} from '@/widget/utility';

export default {
    name: 'MetaComponentInfo',
    components: {
        InfoRender,
    },
    props: {
        getDetailInfo: {
            type: Function,
            required: true,
        },
    },
    data () {
        return {
            fieldLayoutList: [],
            record: null,
        };
    },
    created () {
        this.getDetailInfo().then(({
            fieldLayoutList,
            record,
        }) => {
            this.fieldLayoutList = fieldLayoutList;
            this.record = record;
        }).catch(logError);
    },
    methods: {
        back () {
            this.$router.back();
        },
    },
};
</script>
