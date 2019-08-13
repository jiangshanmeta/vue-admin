<template>
    <div
        class="el-upload-dragger"
        :class="{
            'is-dragover': dragover
        }"
        @drop.prevent="onDrop"
        @dragover.prevent="onDragover"
        @dragleave.prevent="dragover = false"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'UploadDragger',
    props: {
        accept: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            dragover: false,
        };
    },
    methods: {
        onDragover () {
            if (!this.disabled) {
                this.dragover = true;
            }
        },
        onDrop (e) {
            this.dragover = false;
            if (this.disabled) {
                return;
            }
            if (!this.accept) {
                this.$emit('file', e.dataTransfer.files[0]);
                return;
            }
            const acceptList = this.accept.split(',')
                .map(type => type.trim())
                .filter(type => type);

            this.$emit('file', Array.from(e.dataTransfer.files).find(file => {
                const {
                    type, name,
                } = file;
                const extension = name.includes('.')
                    ? `.${name.split('.').pop()}`
                    : '';
                const baseType = type.replace(/\/.*$/, '');
                return acceptList
                    .some(acceptedType => {
                        if (/\..+$/.test(acceptedType)) {
                            return extension === acceptedType;
                        }
                        if (/\/\*$/.test(acceptedType)) {
                            return baseType === acceptedType.replace(/\/\*$/, '');
                        }
                        if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
                            return type === acceptedType;
                        }
                        return false;
                    });
            }));
        },
    },
};
</script>
