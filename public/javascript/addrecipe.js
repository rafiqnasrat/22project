async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="recipe_title"]').value;
    const description = document.querySelector('input[name="recipe_description"]').value;
    const ingredients = document.querySelector('input[name="recipe_ingredients"]').value;
    const instructions = document.querySelector('input[name="recipe_instructions"]').value;
    const time = document.querySelector('input[name="hoursTime"]').value;
    // const category = document.querySelector('input[name="recipe_category"]').value;
    // const diet = document.querySelector('input[name="recipe_diet"]').value;

    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        ingredients,
        instructions,
        time
        // category,
        // diet
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/userlist');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.add-recipe').addEventListener('submit', newFormHandler);