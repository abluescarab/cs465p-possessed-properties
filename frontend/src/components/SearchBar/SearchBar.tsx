import "./SearchBar.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";

const SearchBar = () => {
  return (
    <Card className={"search"}>
      <CardContent>
        <form>
          <TextInput
            name={"search"}
            placeholder={"Search for listings..."}
            style={"none"}
            className={"large"}
          />
          <button type={"submit"}>
            <span className={"material-symbols-rounded dark"}>search</span>
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
