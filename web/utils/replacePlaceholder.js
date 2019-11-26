export default (string = '', regex = /:\w+/g, data = {}) => {
  const placeholders = string.match(regex);
  if (!placeholders) {
    return { string, data };
  }
  let newString = string;
  const newData = data;
  placeholders.forEach(placeholder => {
    const key = placeholder.substr(1);
    if (newData[key]) {
      newString = newString.replace(placeholder, newData[key]);
      delete newData[key];
    } else {
      if(placeholder!==':7001'&&placeholder!==':8000'){
        console.error(`missing '${placeholder}' data in string!`);
      }
    }
  });
  return {
    string: newString,
    data: newData,
  };
};
