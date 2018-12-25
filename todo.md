## 上传组件

element-ui的上传组件有个问题，是把上传和上传后的结果耦合到一起了，然而上传组件仅仅需要上传，上传后的结果展示和预览删除之类的效果是另一个组件的事情。所以upload组件并不需要fileList这个props，更不需要watch这个prop。uploadList这个子组件也应该只负责展示上传进度。

作为表单元素，我所关心的是上传后的后端返回的值，上传进度之类的对我来不重要。

比较棘手的问题是这里牵扯到了异步，还是多个异步。点击删除pending状态又点击删除？

这里还要理一下


## async组件 (done) widget/utility onceAsync

async组件基本成型，一个问题是多个相同的async组件同时初始化，这里会发起多个其实是等价的请求，其实只需要一个请求，怎么写优雅点？

## 共享组件

是针对operators的，一个列表，可能有N条记录，每条记录都完全初始化所有operator的子组件(比如operator-item的dialog等)是有点浪费的，尽可能减少这层消耗

## widget/title (done)

改写成functional component 
vue-meta 看了一眼，有点略重  我只需要改写title

## typescript

这个。。。。


## commonChunk 

升级到webpack4后留下的坑