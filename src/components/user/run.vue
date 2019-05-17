<template>
    <span>
        <el-button
            size="small"
            @click="run"
        >
            香港记者
        </el-button>
        <el-dialog
            :visible.sync="dialogVisible"
        >
            {{ data.name }} 跑得比香港记者还快
            <section #footer>
                <el-button
                    type="danger"
                    @click="doRun"
                >
                    确定
                </el-button>
            </section>
        </el-dialog>
    </span>
</template>

<script>
export default {
    name: 'Run',
    props: {
        data: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data () {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        run () {
            this.dialogVisible = true
        },
        doRun () {
            this.dialogVisible = false
            this.$emit('update')
        },
    },
}
</script>
