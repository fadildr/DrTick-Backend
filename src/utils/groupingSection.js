module.exports = (result) => {
  const dataSection = [];
  result.data.forEach((element) => {
    element.bookingSection.forEach((elementSection) => {
      dataSection.push(elementSection.section);
    });
  });

  const counts = dataSection.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {}
  );

  const sectionCapacity = [
    { section: "VVIP", capacity: 10 },
    { section: "VIP", capacity: 20 },
    { section: "REG", capacity: 30 },
  ];

  // for (const data in counts) {
  //   console.log(`Property : ${data}`);
  //   console.log(`Value : ${counts[data]}`);
  //   console.log("-------");
  // }

  const newData = [];
  Object.keys(counts).forEach((data) => {
    // console.log(`Property : ${data}`);
    // console.log(`Value : ${counts[data]}`);
    // console.log("-------");
    const sectionFind = sectionCapacity.filter((el) =>
      data.includes(el.section)
    ); // {section: "REG", capacity: 30}
    // console.log(sectionFind);
    const resultSection = {
      section: data,
      booked: counts[data],
      available: sectionFind[0].capacity - counts[data],
      statusFull: sectionFind[0].capacity === counts[data], // capacity 30 === booked 30
    };
    newData.push(resultSection);
  });

  return newData;
};
