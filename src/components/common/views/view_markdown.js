import vueMarkdown from 'vue-markdown'
export default{
    name:"view_markdown",
    functional:true,
    props:{
        data:{
            type:String,
        },
    },
    render(h,context){
        return (
            <vueMarkdown {...context.data.attrs}>{context.props.data}</vueMarkdown>
        )
    },
}