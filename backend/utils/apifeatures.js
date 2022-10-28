class ApiFeatures {
  constructor(query, urlQueryStr) {
    this.query = query;
    this.urlQueryStr = urlQueryStr; // ?keyword="apple"&category=test
  }

  search() {
    const queryStr = this.urlQueryStr.keyword
      ? {
          name: {
            $regex: this.urlQueryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...queryStr });
  }

  filter() {
    const queryStrCopy = { ...this.urlQueryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete queryStrCopy[key];
    });

    //filter for price
    let queryStr = JSON.stringify(queryStrCopy); // converting object to string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // replacing gt with &gt and so on
    queryStr = JSON.parse(queryStr); // converting string to object
    this.query = this.query.find(queryStr);
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.urlQueryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
  }
}

module.exports = ApiFeatures;
