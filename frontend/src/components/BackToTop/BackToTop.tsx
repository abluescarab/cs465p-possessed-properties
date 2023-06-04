import "./BackToTop.scss";
import Button from "@/components/Button/Button.tsx";

const BackToTop = () => {
  const scrollToTop = () => {
    document.body.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
  };

  return (
    <Button type={"button"} id={"back-to-top"} onClick={scrollToTop}>
      Back to top
    </Button>
  );
};

export default BackToTop;
