<template>
    <span>
        {{ label }}
        <span style="color:red;">*</span>
    </span>
</template>

<script>
export default {
    name:'LabelUserRedstar',
    props: {
        label: {
            type: String,
            required: true,
        },
    },
};
</script>
