<template>
    <section>
        customername:{{ customername }}
        <el-form-item
            :error="error"
        >
            <EditorText
                v-model="model"
            />
        </el-form-item>
    </section>
</template>

<script>
import EditorText from '@/components/common/Editors/EditorText';
export default {
    name: 'EditorBookAddress',
    components: {
        EditorText,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        customername: {
            type: String,
            required: true,
        },
    },
    computed: {
        model: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
        error () {
            if (this.value === '北极') {
                return '不去北极去广州';
            } else {
                return '';
            }
        },
    },
    methods: {
        validate () {
            if (this.error) {
                return Promise.reject(new Error('不去北极'));
            } else {
                return Promise.resolve();
            }
        },
    },
};
</script>
