export async function postjson(event, form){

    const formData = new FormData(form);

    const title = formData.get("title");
    const shortDescription = formData.get("shortDescription");
    const date = formData.get("date");
    const description = formData.get("description");
    const [year, month, day] = date.split("-");
    await fetch("http://localhost:3999/postjson", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        [title]: {
            "id": Date.now(),
            "short description": shortDescription,
            "date": {
                "day": day,
                "month": month,
                "year": year
            },
            "description": description
        }
    })
    });

  const projectData = {
  [title]: {
    id: Date.now(),  // Use a unique id based on the current timestamp
    "short description": shortDescription,
    date: {
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year)
    },
    description: description
  }
};
window.location.replace("/");    
}