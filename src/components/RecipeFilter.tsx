import { useState } from "react";

const RecipeFilter = ({
  handleTagFilter,
  handleAuthorFilter,
}: {
  handleTagFilter: (filter: string) => void;
  handleAuthorFilter: (filter: string) => void;
}) => {
  const [tagFilter, setTagFilter] = useState<string>("");
  const [authorFilter, setAuthorFilter] = useState<string>("");

  return (
    <div className="flex text-white justify-center p-2 gap-5">
      <input
        className="p-2 rounded-lg"
        placeholder="filter by tags"
        value={tagFilter}
        onChange={(event) => {
          const newTagFilter = event.target.value;
          setTagFilter(newTagFilter);
          handleTagFilter(newTagFilter);
        }}
      />
      <input
        className="p-2 rounded-lg"
        placeholder="filter by author"
        value={authorFilter}
        onChange={(event) => {
          const newAuthorFilter = event.target.value;
          setAuthorFilter(newAuthorFilter);
          handleAuthorFilter(newAuthorFilter);
        }}
      />
    </div>
  );
};

export default RecipeFilter;
