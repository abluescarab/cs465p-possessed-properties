export function getClasses(
  className?: string,
  ...extras: { prop: string; mappings: { value: string; cssClass: string }[] }[]
) {
  const classes = [];

  if (className) {
    classes.push(className);
  }

  for (const extra of extras) {
    const { prop, mappings } = extra;
    const css = mappings.find((m) => m.value == prop);

    if (css) {
      classes.push(css.cssClass);
    }
  }

  return classes.join(" ");
}
