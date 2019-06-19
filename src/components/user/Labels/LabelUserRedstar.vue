<template>
    <span>
        {{ labelName }}
        <span style="color:red;">*</span>
    </span>
</template>

<script>
export default {
    name: 'LabelUserRedstar',
    props: {
        labelName: {
            type: String,
            required: true,
        },
    },
};
</script>
