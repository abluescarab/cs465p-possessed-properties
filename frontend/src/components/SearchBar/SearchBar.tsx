import "./SearchBar.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";

const SearchBar = () => {
  return (
    <Card className={"search"} shadow={"hover"}>
      <CardContent>
        <form>
          <TextInput
            name={"search"}
            placeholder={"Search for listings..."}
            className={"large"}
          />
          <Button type={"submit"}>
            <span className={"material-symbols-rounded dark"}>search</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
