function getStore(vm,cb){
    cb([
        {"_id":3,"storename":"北京店"},
        {"_id":5,"storename":"上海店"},
        {"_id":7,"storename":"广州店"},
        {"_id":9,"storename":"深圳店"},
        {"_id":11,"storename":"杭州店"}
    ])
}

function getSaler(vm,data,cb){
    let storeId = data.store;
    let rst;
    switch(storeId){
        case 3:
            rst = [
                {label:"渡边早季",value:1},
                {label:"青沼瞬",value:5},
            ];
            break;
        case 5:
            rst = [
                {label:"秋月真理亚",value:3},
            ];
            break;
        case 7:
            rst = [
                {label:"渡边早季",value:1},
                {label:"秋月真理亚",value:3},
            ];
            break;
        case 9:
            rst = [
                {label:"伊东守",value:4},
                {label:"秋月真理亚",value:3},
            ];
            break;
        case 11:
            rst = [
                {label:"朝比奈觉",value:2},
                {label:"青沼瞬",value:5},
                {label:"秋月真理亚",value:3},
            ];
            break;
    }
    cb(rst);

}


const bookTable = [
    {
        id:1,
        customername:"鲁鲁修",
        totalprice:100,
        address:"Ashford",
        store:3,
        saler:1,
    },

];

let id = bookTable.length + 1;

const createFields = [
    ["customername","totalprice"],
    ["address"],
    ["store","saler"]
];

function getCreateFields(vm,cb){
    cb(createFields);
}

function createBook(vm,data,cb){
    data.id = id++;
    bookTable.push(data);
    cb();
}

function getBookList(vm,params,cb){
    let data = bookTable;
    let fields = ["customername","totalprice","address"];
    let total = data.length;
    cb({
        data,
        fields,
        total,
    })
}

export {
    getStore,
    getSaler,
    getCreateFields,
    createBook,
    getBookList,
}