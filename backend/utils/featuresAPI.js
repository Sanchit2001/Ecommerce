class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",
            },
        }:{};
        console.log(keyword,this.queryStr.keyword);
        this.query = this.query.find({...keyword});

        return this;
    }

    filter(){
        const queryCpy = {...this.queryStr};
        console.log(queryCpy);
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCpy[key]);
        console.log(queryCpy);
        let queryStr = JSON.stringify(queryCpy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage*(currentPage-1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;