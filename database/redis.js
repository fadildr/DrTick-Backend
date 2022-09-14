const client = require("../src/config/redis");

const testData = async () => {
  try {
    // const data = [
    //   {
    //     id: 1,
    //     name: "Tea",
    //   },
    //   {
    //     id: 2,
    //     name: "Milk",
    //   },
    // ];
    // const convertData = JSON.stringify(data);
    // console.log("Data Redis Convert = ", convertData);
    // const replaceData = JSON.parse(convertData);
    // console.log("Data Redis Replace = ", replaceData);
    const result = await client.get("*");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

testData();
