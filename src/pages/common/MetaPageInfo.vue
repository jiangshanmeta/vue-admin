<template>
    <div>
        <el-button @click="back">
            返回
        </el-button>
        <InfoView
            v-if="modelLoaded"
            v-bind="model"
        />
    </div>
</template>

<script>
import InfoView from '@/components/common/InfoView';
import {
    infoPageMixin,
} from '@/mixins/router/modelRouterMixin';

export default {
    name: 'MetaPageInfo',
    components: {
        InfoView,
    },
    mixins: [
        infoPageMixin,
    ],
    methods: {
        back () {
            this.$router.back();
        },
    },
};
</script>
