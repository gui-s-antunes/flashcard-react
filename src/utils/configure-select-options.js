export function configureSelectOptions(arr) {
  return arr.map((obj) => {
    return {
      value: obj.id,
      label: obj.name,
    };
  });
}
