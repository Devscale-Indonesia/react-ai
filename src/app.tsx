import { useState } from "react";

interface Result {
  result: {
    dishName: string;
    ingredients: string[];
    howToMake: string[];
  };
}

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [style, setStyle] = useState("");
  const [recipes, setRecipes] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerateRecipe() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, style }),
      });

      const data = await res.json();
      console.log(data);
      setRecipes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section>
        <input placeholder="Masukkan bahan-bahan" onChange={(e) => setIngredients(e.target.value)} />
        <select onChange={(e) => setStyle(e.target.value)}>
          <option value="italian food">Italian</option>
          <option value="philipines food">Filipino</option>
          <option value="asian food">Asian</option>
          <option value="chinese food">Chinese</option>
          <option value="american food">American</option>
        </select>
        <button disabled={loading} onClick={handleGenerateRecipe}>
          Generate Recipe
        </button>
      </section>
      {recipes && (
        <div>
          <h1>{recipes.result.dishName}</h1>
          <h3>Ingredients</h3>
          <ul>
            {recipes.result.ingredients.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
          <h3>How to Make it</h3>
          <ul>
            {recipes.result.howToMake.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
      )}
    </main>
  );
}
