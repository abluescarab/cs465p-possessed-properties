import { Location, NavigateFunction, useNavigate } from "react-router-dom";

const siteTitle = "Possessed Properties";

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
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
