import { Location, NavigateFunction } from "react-router-dom";

const siteTitle = "Possessed Properties";

export const formatCurrencyString = (str) => {
  return `$${str.toLocaleString()}`;
};

export const formatDateString = (str) => {
  return new Date(str).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export function compare(a, b, descending) {
  let val1 = a;
  let val2 = b;

  if (descending) {
    val1 = b;
    val2 = a;
  }

  if (val1 < val2) {
    return -1;
  }

  if (val1 > val2) {
    return 1;
  }

  return 0;
}

export function getClasses(
  className?: string,
  ...extras: { prop: any; mappings: { value: any; cssClass: string }[] }[]
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

export function resetTitle() {
  document.title = siteTitle;
}

export function setTitle(pageTitle: string) {
  document.title = `${pageTitle} | ${siteTitle}`;
}

export function navigateNext(
  navigate: NavigateFunction,
  location: Location,
  next: string
) {
  navigate(next, { state: { prev: location.pathname } });
}

export function navigateLast(navigate: NavigateFunction, location: Location) {
  navigate(location.state.prev);
}

export function randomElement(array, count) {
  if (count < 1) {
    return [];
  }

  if (count >= array.length) {
    return array;
  }

  const indices = [...Array(array.length).keys()];
  const selected = [];

  while (count--) {
    const idx = Math.floor(Math.random() * indices.length);
    const select = indices[idx];
    selected.push(array[select]);
    indices.splice(idx, 1);
  }

  return selected;
}
