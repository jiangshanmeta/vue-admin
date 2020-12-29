<template>
    <div>
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
    name: 'InfoView',
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
};
</script>
