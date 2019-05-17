<template>
    <section>
        customername:{{ customername }}
        <fieldText
            v-model="model"
        />
    </section>
</template>

<script>
import fieldText from '@/components/common/editor/editor_text'
export default {
    components: {
        fieldText,
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
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            },
        },
    },
}
</script>
