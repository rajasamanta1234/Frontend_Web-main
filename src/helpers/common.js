export const handelError = (error, setFormData) => {
  const errors = error.issues;
  console.log(errors);

  errors.length > 0 &&
    errors.forEach((error) => {
      if (error.message !== "") {
        const field = error.path[0] + "Err";

        setFormData((_prevState) => ({
          ..._prevState,
          [field]: true,
          [`${field}Msg`]: error.message,
        }));
      }
    });
};

export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
